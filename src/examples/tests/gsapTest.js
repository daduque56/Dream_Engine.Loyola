import * as THREE from 'three'  
import gsap from 'gsap'
import Dream_Engine from '../../dream_Engine/Dream_Engine'
import * as CANNON from 'cannon-es'

const dream = new Dream_Engine();

const worldCenter = dream.Mesh.CreateAxesHelper(3);
worldCenter.name = "worldCenter";
worldCenter.position.set(0, 0, 0); 

//------------------------------------------------>> CAMARA Y LUCES

dream.camera.instance.position.set(200,203, 200);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream.camera.instance.zoom = 15
dream.camera.instance.updateProjectionMatrix()
dream.Physics.world.gravity.set(0, -9.81, 0)

const ambientLight = dream.Light.CreateAmbientLight();
const directionalLight = dream.Light.CreateDirectionalLight('white', 6);
directionalLight.position.set(5, 3, 3);

const ground = dream.Mesh.CreateGridHelper();

const animationPointStart = dream.Mesh.CreateAxesHelper(3);
animationPointStart.position.set(0, 0, -3.5);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshStandardMaterial({color: 'Red'});
let cube = new THREE.Mesh(geometry, material);

cube.position.set(0, 0.5, 0);

dream.scene.add(cube);

let cubo = dream.createObject('cubo');
dream.addComponentToObject(
    cubo,
    'Mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({color: 'green'})
    )
)
dream.addComponentToObject(
    cubo,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 2,
        shape: new CANNON.Box(new CANNON.Vec3(0.45, 0.4, 0.45))
    }) 
)
dream.rigidbody.position.set(0, 4, 0)
/*const animAdelante = gsap.timeline({ repeat: 3});

    animAdelante.fromTo(cube.position,
        {delay:0,
        duration:0.125,
        x: (cube.position.x),
        y: (cube.position.y),
        z: (cube.position.z)},
        {delay:0,
        duration:1,
        x: (cube.position.x),
        y: (cube.position.y),
        z: (cube.position.z - 3.5)}
    );
animAdelante.endTime(1)*/

let animAdelante = gsap.to(cube.position,
     {duration: 0.5,
         x: 0,
         y: 0,
         z: "-=1",
         ease: "back.inOut(1.7)",
         paused: true
        }
);

let animAtras = gsap.to(cube.position,
    {duration: 0.5,
        x: 0,
        y: 0,
        z: "+=1",
        ease: "back.inOut(1.7)",
        paused: true
    }
);  

dream.update = (dt) => {
    if (dream.input.isKeyPressed('KeyW')) {
        animAdelante.invalidate();
        animAdelante.restart();
        console.log('Finala position is: ', cube.position.z);
    }
    if (dream.input.isKeyPressed('KeyS')) {
        animAtras.invalidate();
        animAtras.restart();
        console.log('Finala position is: ', cube.position.z);
    }
}

dream.start()