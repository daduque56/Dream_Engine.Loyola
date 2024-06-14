import Dream_Engine from "../../dream_Engine/Dream_Engine";
import * as THREE from 'three'  
import Logger from '../../dream_Engine/Logger'



const dream_Engine = new Dream_Engine()
dream_Engine.logger = new Logger()

// Helpers 
const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

// Posición default de la cámara
dream_Engine.camera.instance.position.set(200, 200, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.lookAt(0, -40, 0);
dream_Engine.camera.instance.zoom = 2
dream_Engine.camera.instance.updateProjectionMatrix()

// Reticula suelo
const gridHelper = dream_Engine.Mesh.CreateGridHelper(100, 100)
gridHelper.position.z = 0
gridHelper.position.x = 0
gridHelper.position.y = -6

// Jugador
const player1 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.CapsuleGeometry(3, 5, 5),
    new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false})
)
player1.position.x = 0
player1.position.y = 1
player1.position.z = 0

dream_Engine.camera.instance.lookAt(player1.position);
const player1Box = new THREE.Box3().setFromObject(player1)

// Suelo
const suelo = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(200, 200, 100),
    new THREE.MeshBasicMaterial({ color: 'white', wireframe: false})
)
suelo.rotateX(-Math.PI / 2)
suelo.position.y = -6.2
suelo.add(axesHelper)

//Zombie
const zombie = dream_Engine.Mesh.CreateFromGeometry(   
    new THREE.CapsuleGeometry(3, 5, 5),
    new THREE.MeshBasicMaterial({ color: 'green', wireframe: true})
) 
let zomAxeshelper = dream_Engine.Mesh.CreateAxesHelper()
zomAxeshelper.position.copy(zombie.position)
zombie.add(zomAxeshelper)
zombie.position.x = 50
zombie.position.y = 1
zombie.position.z = 0

// FOVzombie
const fovzombie = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.ConeGeometry(5, 20, 32, 1, true, 0),
    new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true, opacity: 0.5})
)
fovzombie.rotateX(-Math.PI / 2),
fovzombie.position.copy(zombie.position)
dream_Engine.scene.add(fovzombie)

const fovzombie2 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.RingGeometry(19, 20, 30, 1  ),
    new THREE.MeshBasicMaterial({ color: 'red', transparent: true, opacity: 0.5})
)
fovzombie2.rotateY(-Math.PI / 2),
fovzombie2.position.copy(zombie.position)
dream_Engine.scene.add(fovzombie2)


// Flecha de dirección
let direction = new THREE.Vector3(1, 0, 0); // adjust this as needed
let origin = zombie.position; // initial position
let length = 10; // length of the arrow
let color = 0xff0000; // color of the arrow

let arrowHelper = dream_Engine.Mesh.CreateArrowHelper(direction, origin, length, color);
dream_Engine.scene.add(arrowHelper);

dream_Engine.start(); {
}

// Rutas de los zombies
let waypoints = [
    new THREE.Vector3(-65, 0, -65), // bottom-left corner
    new THREE.Vector3(65, 0, -65),  // bottom-right corner
    new THREE.Vector3(65, 0, 65),   // top-right corner
    new THREE.Vector3(-65, 0, 65)   // top-left corner
];
let currentWaypointIndex = 0;

dream_Engine.update = (dt) => {

// Movimiento del jugador
    if (dream_Engine.input.isKeyPressed('KeyW') || dream_Engine.input.isKeyPressed('ArrowUp')) {
        player1.position.z -= 0.5
    }
    if (dream_Engine.input.isKeyPressed('KeyS')|| dream_Engine.input.isKeyPressed('ArrowDown')) {
        player1.position.z += 0.5
    }   
    if (dream_Engine.input.isKeyPressed('KeyA') || dream_Engine.input.isKeyPressed('ArrowLeft')) {
        player1.position.x -= 0.5
    }   
    if (dream_Engine.input.isKeyPressed('KeyD') || dream_Engine.input.isKeyPressed('ArrowRight')) {
        player1.position.x += 0.5
    }

    // Detectar limites del mundo y poner a los jugadores en el centro
    if (player1.position.x < -100 || 
        player1.position.x > 100 || 
        player1.position.z < -100 || 
        player1.position.z > 100 ) 
    {
        dream_Engine.logger.debug('----> PacMan salio de los limites <----')
        player1.position.x = 0;
        player1.position.z = 0;
    }

    // Calculate the vector from the enemy to the player
    let toPlayer = new THREE.Vector3().subVectors(player1.position, zombie.position);

    // Normalize the vector (make its length 1)
    toPlayer.normalize();

    // Calculate the enemy's facing direction
    let enemyFacing = new THREE.Vector3(1, 0, 0); // replace with actual facing direction if available

    // Calculate the dot product of the two vectors
    let dotProduct = toPlayer.dot(enemyFacing);

    // FOV in degrees
    let fov = 180; // adjust this value as needed

    // Convert FOV to radians and calculate cosine
    let cosFov = Math.cos(fov * (Math.PI / 180));

    // Check if the player is within the enemy's FOV
    if (dotProduct > cosFov && zombie.position.distanceTo(player1.position) <= 35) {
        // Player is within FOV, chase the player
        let direction = new THREE.Vector3().subVectors(player1.position, zombie.position).normalize();
        //fovzombie.setDirection(direction);
        let speed = 20; // adjust speed as needed
        zombie.position.add(direction.multiplyScalar(speed * dt));
    } else {
    // Player is not within FOV, patrol the waypoints
        let direction = new THREE.Vector3().subVectors(waypoints[currentWaypointIndex], zombie.position).normalize();
        let speed = 20; // adjust speed as needed
        zombie.position.add(direction.multiplyScalar(speed * dt));
        fovzombie.lookAt(new THREE.Vector3().addVectors(zombie.position, direction));

    // If the zombie is close to the waypoint, move to the next waypoint
        if (zombie.position.distanceTo(waypoints[currentWaypointIndex]) < 1) {
            currentWaypointIndex = (currentWaypointIndex + 1) % waypoints.length;
        }
    }

    arrowHelper.position.copy(zombie.position);
    fovzombie.position.copy(zombie.position);
    fovzombie2.position.copy(zombie.position);

    // Update the direction of the ArrowHelper
    // If the enemy is chasing the player
    if (dotProduct > cosFov) {
        let direction = new THREE.Vector3().subVectors(player1.position, zombie.position).normalize();
        arrowHelper.setDirection(direction);
        fovzombie.lookAt(new THREE.Vector3().addVectors(zombie.position, direction));
        fovzombie2.lookAt(new THREE.Vector3().addVectors(zombie.position, direction));
       
    } else {
        // If the enemy is moving towards a waypoint
        let direction = new THREE.Vector3().subVectors(waypoints[currentWaypointIndex], zombie.position).normalize();
        arrowHelper.setDirection(direction);
        fovzombie.lookAt(new THREE.Vector3().addVectors(zombie.position, direction));
        fovzombie2.lookAt(new THREE.Vector3().addVectors(zombie.position, direction));
    }
   
}


