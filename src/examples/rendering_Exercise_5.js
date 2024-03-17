import * as  THREE from 'three';
import Dream_Engine from '../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine()

// Set the camera position
dream_Engine.camera.position = 100;

// Crear la forma del pentagono (PacMan)
const PacMan = new THREE.Shape();
const size = 100;
const sides = 5;
for (let i = 0; i < sides; i++) {
    PacMan.lineTo(size * Math.cos(2 * Math.PI * i / sides), size * Math.sin(2 * Math.PI * i / sides));
}
PacMan.autoClose = true; 
const geometry = new THREE.ShapeGeometry(PacMan);
const material = new THREE.MeshBasicMaterial({ color: 0x800080})
const pentagon  = new THREE.Mesh(geometry,material)
dream_Engine.scene.add(pentagon);
pentagon.position.z = 1;

const PacManBox = new THREE.Box3().setFromObject(pentagon);

dream_Engine.start()

const circles = []
const circleBoxes = []

dream_Engine.update = (dt) => {
    const time = dream_Engine.totalElapsedInSeconds

    PacManBox.setFromObject(pentagon);

    if (dream_Engine.input.isKeyPressed('KeyD')){
        pentagon.position.x += 500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyA')){
        pentagon.position.x -= 500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyW')){
        pentagon.position.y +=  500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyS')){
        pentagon.position.y -= 500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyQ')){
        pentagon.rotation.z += 10 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyE')){
        pentagon.rotation.z -= 10 * dt
    }

    if (circles.length <= 25) {
        const circleGeometry = new THREE.CircleGeometry(11, 38);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.x = (Math.random() - 0.5) * 2000;
        circle.position.y = (Math.random() - 0.5) * 2000;
        dream_Engine.scene.add(circle);
        circle.position.z = 1;
        circles.push(circle);

        const circleBox = new THREE.Box3().setFromObject(circle);
        circleBoxes.push(circleBox);
    }
    for (let i = 0; i < circleBoxes.length; i++) {
        circleBoxes[i].setFromObject(circles[i]);
        if (PacManBox.intersectsBox(circleBoxes[i])) {
            console.log('----> PacMan se comio un circulo <----');
            circles[i].material.visible = false;
            circleBoxes.splice(i, 1);
            circles.splice(i, 1);
            break;
        }
    }   
}
