import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../../dream_Engine/Dream_Engine";

const torqueGame = new Dream_Engine();
torqueGame.camera.instance.position.set(40, 0, 0);
torqueGame.Physics.world.gravity.set(0, -2.81, 0);

// ------------------------------------------> FONDO DEL ESCENARIO
const gridHelper = torqueGame.Mesh.CreateGridHelper(1000, 500, 'gray', 'gray');

gridHelper.rotateX(Math.PI / 2);
gridHelper.rotateZ(Math.PI / 2);

// ------------------------------------------> LUCES
const ambientLight = torqueGame.Light.CreateAmbientLight('white', 1);
const directionalLight = torqueGame.Light.CreateDirectionalLight('white', 1);

// ------------------------------------------> JUGADOR
const cubeSize = 1;
const cubeHalfExtents = new CANNON.Vec3(cubeSize * 0.5, cubeSize * 0.5, cubeSize * 0.5);

const cube = torqueGame.createObject();
torqueGame.addComponentToObject(
    cube,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.ConeGeometry(0.5, 1.5, 15),
        new THREE.MeshStandardMaterial({ color: 'purple'})
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
const cubeHelper = torqueGame.Mesh.CreateAxesHelper(2);
cube.rigidbody.position.set(0, 10, 0);

// ------------------------------------------> MESH´s PARA SIMULAR THROTTLE DE NAVE
const ThrottleUp = torqueGame.createObject();
torqueGame.addComponentToObject(
    ThrottleUp,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.ConeGeometry(0.2, 0.8, 15),
        new THREE.MeshStandardMaterial({ color: 'yellow'})
    )
)
ThrottleUp.mesh.rotateX(Math.PI);

const ThrottleDown = torqueGame.createObject();
torqueGame.addComponentToObject(
    ThrottleDown,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.ConeGeometry(0.35, 0.8, 15),
        new THREE.MeshStandardMaterial({ color: 'yellow'})
    )
)
const ThrottleRight = torqueGame.createObject();
torqueGame.addComponentToObject(
    ThrottleRight,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.ConeGeometry(0.2, 0.8, 15),
        new THREE.MeshStandardMaterial({ color: 'yellow'})
    )
)
ThrottleRight.mesh.rotateX(Math.PI / 3.5);

const ThrottleLeft = torqueGame.createObject();
torqueGame.addComponentToObject(
    ThrottleLeft,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.ConeGeometry(0.2, 0.8, 15),
        new THREE.MeshStandardMaterial({ color: 'yellow'})
    )
)
ThrottleLeft.mesh.rotateX(-Math.PI / 3.5);

// ------------------------------------------> PLATAFORMA DE INICIO
const platform = torqueGame.createObject();
torqueGame.addComponentToObject(
    platform,
    'mesh',
    torqueGame.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(3, 1, 4),
        new THREE.MeshStandardMaterial({ color: 'crimson'})
    )
)
torqueGame.addComponentToObject(
    platform,
    'rigidbody',
    torqueGame.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(0, 0, 0))
    })
)
const platHelper = torqueGame.Mesh.CreateAxesHelper(1);
platform.mesh.position.set(0, -0.5, 0);

// ------------------------------------------|

//cube.rigidbody.applyForce(new CANNON.Vec3(0, 0, 0));
//cube.rigidbody.applyLocalForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(0, 1, 0));
//cube.rigidbody.velocity.set(0, 1, 0);

// ------------------------------------------> UPDATE
torqueGame.update = (dt) => {

    ThrottleRight.mesh.position.set(cube.rigidbody.position.x, (cube.rigidbody.position.y + 0.2), cube.rigidbody.position.z - 0.4);
    ThrottleLeft.mesh.position.set(cube.rigidbody.position.x, (cube.rigidbody.position.y + 0.2), cube.rigidbody.position.z + 0.4);
    ThrottleUp.mesh.position.set(cube.rigidbody.position.x, (cube.rigidbody.position.y + 1), cube.rigidbody.position.z);
    ThrottleDown.mesh.position.set(cube.rigidbody.position.x, (cube.rigidbody.position.y - 1), cube.rigidbody.position.z);

// ------------------------------------------> update physics
    cube.mesh.position.copy(cube.rigidbody.position);
    cube.mesh.quaternion.copy(cube.rigidbody.quaternion);
    platHelper.position.copy(platform.rigidbody.position)
    cubeHelper.position.copy(cube.rigidbody.position)
    cubeHelper.quaternion.copy(cube.rigidbody.quaternion)
    
// ------------------------------------------> update camara con pos JUGADOR
    
    torqueGame.camera.instance.lookAt(cube.mesh.position);
    torqueGame.camera.instance.position.y = cube.rigidbody.position.y
    torqueGame.camera.instance.position.z = cube.rigidbody.position.z

// ------------------------------------------> Fuerzas, torque y teclas

    if (torqueGame.input.isKeyPressed('KeyW')){
        cube.rigidbody.applyLocalForce(new CANNON.Vec3(0, 6, 0));
        ThrottleDown.mesh.material.opacity = 2;
        ThrottleDown.mesh.material.transparent = false;
    } else {
        ThrottleDown.mesh.material.opacity = 0.3;
        ThrottleDown.mesh.material.transparent = true;
    }
    if (torqueGame.input.isKeyPressed('KeyA')|| torqueGame.input.isKeyPressed('ArrowLeft')){
        cube.rigidbody.applyTorque(new CANNON.Vec3(0.5, 0, 0));
        ThrottleRight.mesh.material.opacity = 2;
        ThrottleRight.mesh.material.transparent = false;
    } else {
        ThrottleRight.mesh.material.opacity = 0.3;
        ThrottleRight.mesh.material.transparent = true;
    }
    if (torqueGame.input.isKeyPressed('KeyS')){
        cube.rigidbody.applyLocalForce(new CANNON.Vec3(0, -9, 0))
        ThrottleUp.mesh.material.opacity = 2;
        ThrottleUp.mesh.material.transparent = false;
    } else {
        ThrottleUp.mesh.material.opacity = 0.3;
        ThrottleUp.mesh.material.transparent = true;
    }
    if (torqueGame.input.isKeyPressed('KeyD')){
        cube.rigidbody.applyTorque(new CANNON.Vec3(-0.5, 0, 0));
        ThrottleLeft.mesh.material.opacity = 2;
        ThrottleLeft.mesh.material.transparent = false;
    } else {
        ThrottleLeft.mesh.material.opacity = 0.3;
        ThrottleLeft.mesh.material.transparent = true;
    }

}

torqueGame.start();