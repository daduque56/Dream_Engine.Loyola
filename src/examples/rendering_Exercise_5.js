import * as  THREE from 'three';
import Dream_Engine from '../dream_Engine/Dream_Engine';
import Logger from '../dream_Engine/Logger';

const dream_Engine = new Dream_Engine()

dream_Engine.logger = new Logger()

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
const material = new THREE.MeshBasicMaterial({ color: 0xFFF300})
const pentagon  = new THREE.Mesh(geometry,material)
dream_Engine.scene.add(pentagon);
pentagon.position.z = 1;

const PacManBox = new THREE.Box3().setFromObject(pentagon);

// Arrays para los puntos y enemigos con sus boxes
const circles = []
const circleBoxes = []
const enemigos = []
const enemigoBoxes = []

let puntos = 0;
let pausa = true;
let rotacionTotal = 0;

const colorOriginalEnemigos = 0xC500FF;
const colorOriginalPuntos = 0xffffff;

const colorPausaEnemigos = 0xff0000; 
const colorPausaPuntos = 0x0000ff;

dream_Engine.start(); {
    dream_Engine.logger.debug('------> BIENVENIDO A PACMAN <------')
dream_Engine.logger.error('By: Loyola Dream Engine!!!')
dream_Engine.logger.info('----------------------------------------')
dream_Engine.logger.debug('Instrucciones:')
dream_Engine.logger.info('----------------------------------------')
dream_Engine.logger.debug('Usa las teclas W, A, S, D para mover a PacMan')
dream_Engine.logger.debug('Usa las teclas Q, E para rotar a PacMan')
dream_Engine.logger.debug('Oprime F5 para reiniciar el juego cuando no haya mas puntos en pantalla')
dream_Engine.logger.debug('Si sales de los limites del mundo, PacMan morira')
dream_Engine.logger.debug('Si un enemigo toca a PacMan tambien morira')
dream_Engine.logger.info('----------------------------------------')
dream_Engine.logger.debug('Oprime C para empezar el juego')
dream_Engine.logger.info('----------------------------------------')
}

dream_Engine.logger.debug('La puntuación inicial es:'+ puntos)

dream_Engine.update = (dt) => {
    const time = dream_Engine.totalElapsedInSeconds


    //dream_Engine.logger.info('La puntuación actual es:' + puntos)

    PacManBox.setFromObject(pentagon);

    // Pausar el juego
    if (dream_Engine.input.isKeyPressed('Escape')) {
        pausa = true;
        for (let i = 0; i < enemigos.length; i++) {
            enemigos[i].material.color.set(colorPausaEnemigos);
        }
        for (let i = 0; i < circles.length; i++) {
            circles[i].material.color.set(colorPausaPuntos);
        }
    }
   
    if (dream_Engine.input.isKeyPressed('KeyC')) {
        dream_Engine.logger.debug('----> Juego reanudado <----')
        pausa = false;  
        for (let i = 0; i < enemigos.length; i++) {
            enemigos[i].material.color.set(colorOriginalEnemigos);
        }
        for (let i = 0; i < circles.length; i++) {
            circles[i].material.color.set(colorOriginalPuntos);
        }
    }
    if (pausa) {
        return;
    }
    // Teclas movimientos 
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
        rotacionTotal += 10 * dt;
        if (rotacionTotal >= 2 * Math.PI) {
            puntos = puntos + 100;
            dream_Engine.logger.points('La puntuación actual es:' + puntos)
            rotacionTotal -= 2 * Math.PI;
        }
    }
    if (dream_Engine.input.isKeyPressed('KeyE')){
        pentagon.rotation.z -= 10 * dt
        rotacionTotal += 10 * dt;
        if (rotacionTotal >= 2 * Math.PI) {
            puntos = puntos + 100;
            dream_Engine.logger.points('La puntuación actual es:' + puntos)
            rotacionTotal -= 2 * Math.PI;
        }
    }
    // Crear puntos para PacMan
    if (circles.length <= 30) {
        const circleGeometry = new THREE.CircleGeometry(13, 38);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.x = (Math.random() - 0.5) * 3000;
        circle.position.y = (Math.random() - 0.5) * 1500;
        dream_Engine.scene.add(circle);
        circle.position.z = 1;
        circles.push(circle);

        const circleBox = new THREE.Box3().setFromObject(circle);
        circleBoxes.push(circleBox);
    }
    // Detectar colisiones puntos PacMan
    for (let i = 0; i < circleBoxes.length; i++) {
        circleBoxes[i].setFromObject(circles[i]);
        if (PacManBox.intersectsBox(circleBoxes[i])) {
            dream_Engine.logger.info('----> PacMan se comio un circulo <----');
            puntos = puntos + 50;
            dream_Engine.logger.points('La puntuación actual es:' + puntos)
            circles[i].material.visible = false;
            circleBoxes.splice(i, 1);
            circles.splice(i, 1);
            break;
        }
    }  
    // Crear enemigos
    if (enemigos.length <= 4) {
    const circleGeometry = new THREE.CircleGeometry(40, 67);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xC500FF });
        const enemigo = new THREE.Mesh(circleGeometry, circleMaterial);
        const borde = 300;
        enemigo.position.x = (Math.random() - 0.5) * (3500 - 2 * borde) + Math.sign(Math.random() - 0.5) * borde;
        enemigo.position.y = (Math.random() - 0.5) * (1500 - 2 * borde) + Math.sign(Math.random() - 0.5) * borde;
        dream_Engine.scene.add(enemigo);
        enemigo.position.z = 1;
        enemigos.push(enemigo);

        const enemigoBox = new THREE.Box3().setFromObject(enemigo);
        enemigoBoxes.push(enemigoBox); 
    }
    // Randomizar el movimiento de los enemigos
    for (let i = 0; i < enemigos.length; i++) {
        const posicionPacMan = new THREE.Vector3().subVectors(pentagon.position, enemigos[i].position).normalize();
        
        if (posicionPacMan) {
        posicionPacMan.x += (Math.random() - 0.5) * 0.2;
        posicionPacMan.y += (Math.random() - 0.5) * 0.2;

        posicionPacMan.normalize();
        
        enemigos[i].position.x += posicionPacMan.x * 150 * dt; 
        enemigos[i].position.y += posicionPacMan.y * 150 * dt; 
        
        // Revisar la distancia entre enemigos y mantenerlos laejados entre si
        for (let j = 0; j < enemigos.length; j++) {
            if (i !== j) 
            {
                const dx = enemigos[i].position.x - enemigos[j].position.x;
                const dy = enemigos[i].position.y - enemigos[j].position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 525) 
                { 
                    enemigos[i].position.x += dx * 10 * dt; 
                    enemigos[i].position.y += dy * 10 * dt; 
                }

                enemigoBoxes[i].setFromObject(enemigos[i]);
            }
        }
    }
    }
    // Detectar colisiones enemigos PacMan
    for (let i = 0; i < enemigoBoxes.length; i++) {
        if (PacManBox.intersectsBox(enemigoBoxes[i])) {
            dream_Engine.logger.error('----> PacMan murio por un enemigo <----');
            puntos = 0;
            dream_Engine.logger.points('La puntuación actual es:' + puntos)
            pentagon.position.x = 0;
            pentagon.position.y = 0;
            enemigos[i].material.visible = false;
            enemigoBoxes.splice(i, 1);
            enemigos.splice(i, 1);
            break;
        }
    }
    // Detectar limites del mundo y reiniciar juego
    if (pentagon.position.x < -1500 || 
        pentagon.position.x > 1500 || 
        pentagon.position.y < -800 || 
        pentagon.position.y > 800) 
    {
        dream_Engine.logger.debug('----> PacMan salio de los limites <----')
        pentagon.position.x = 0;
        pentagon.position.y = 0;
    }
}
