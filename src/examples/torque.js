import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const torqueGame = new Dream_Engine();
torqueGame.camera.instance.position.set(4, 2, 4);
torqueGame.camera.instance.lookAt(0, 0, 0);
torqueGame.Mesh.CreateGridHelper(10, 10, 'white', 'white');

const ambientLight = torqueGame.Light.CreateAmbientLight('white', 1);
const directionalLight = torqueGame.Light.CreateDirectionalLight('white', 1);

const cubeSize = 2;
const cubeHalfExtents = new CANNON.Vec3(cubeSize * 0.5, cubeSize * 0.5, cubeSize * 0.5);

const cube = torqueGame.createObject();
torqueGame.addComponentToObject(
    cube,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
        new THREE.MeshPhongMaterial({ color: 'crimson' })
    )
)
torqueGame.addComponentToObject(
    cube,
    'rigidbody',
    torqueGame.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Box(cubeHalfExtents)
    })
)

cube.rigidbody.applyTorque(new CANNON.Vec3(55, 55, 55));
//cube.rigidbody.applyForce(new CANNON.Vec3(0, 0, 10));
//cube.rigidbody.applyLocalForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(0, 1, 0));

torqueGame.update = (dt) => {

    cube.mesh.position.copy(cube.rigidbody.position);
    cube.mesh.quaternion.copy(cube.rigidbody.quaternion);
    //console.log(cube.rigidbody.quaternion)
}

torqueGame.start();