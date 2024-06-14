import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from '../../dream_Engine/Dream_Engine';

const gameTest = new Dream_Engine();
gameTest.camera.instance.position.set(20, 20, 30);

const ambientLight = gameTest.Light.CreateAmbientLight('white', 0.5);
const directionalLight = gameTest.Light.CreateDirectionalLight('white', 2)

gameTest.scene.instance.add(ambientLight, directionalLight);    
const basketball = gameTest.createObject();
gameTest.addComponentToObject(
    basketball,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(2, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'orange' })
    )
)
gameTest.addComponentToObject(
    basketball,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1),
        velocity: new CANNON.Vec3(0, 0, 0)
    })
)
const angularVelocity = new CANNON.Vec3(-8, 0, 8);
const linearVelocity = new CANNON.Vec3(6, 0, -5);

//basketball.mesh.castShadow = true;
//basketball.mesh.receiveShadow = true;
basketball.rigidbody.position.set(0, 2, 0);
basketball.rigidbody.velocity.copy(linearVelocity)
basketball.rigidbody.angularVelocity.copy(angularVelocity)

const obstacle = gameTest.createObject();
gameTest.addComponentToObject(
    obstacle,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(20, 4, 6),
        new THREE.MeshStandardMaterial({ color: 'purple' })
    )
)
//obstacle.mesh.castShadow = true;
//obstacle.mesh.receiveShadow = true;
obstacle.mesh.position.set(0, 1, -30);
gameTest.camera.instance.lookAt(basketball.position);


const floor = gameTest.createObject()
gameTest.addComponentToObject(
    floor,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 'black' })
    )
)
//floor.mesh.receiveShadow = true;
floor.mesh.rotation.x = -Math.PI / 2;
floor.mesh.position.y = 0;

const gridHelper = gameTest.Mesh.CreateGridHelper(200, 10, 'darkslategray', 'darkslategray');
const basketballArrowHelper = gameTest.Mesh.CreateArrowHelper(
    basketball.rigidbody.velocity,
    basketball.mesh.position,
    4, 'red');
const windArrowHelper = gameTest.Mesh.CreateArrowHelper(
    new CANNON.Vec3(-0.5, 0, 0),
    basketball.rigidbody.position,
    4, 'blue');

gameTest.scene.instance.add(gridHelper, basketballArrowHelper, windArrowHelper);    

gameTest.camera.instance.lookAt(obstacle.mesh.position);

gameTest.start();

gameTest.update = (dt) => {
    basketball.mesh.position.copy(basketball.rigidbody.position);
    basketballArrowHelper.position.copy(basketball.rigidbody.position);
    basketballArrowHelper.setDirection(basketball.rigidbody.velocity);
    windArrowHelper.position.copy(basketball.rigidbody.position);

    const magnusForce = gameTest.Forces.GenerateMagnusForce(
        angularVelocity,
        linearVelocity,
        2);
    const windForce = new CANNON.Vec3(-0.5, 0, 0);

    basketball.rigidbody.applyForce(windForce);

    if (gameTest.input.isKeyPressed('KeyW') || gameTest.input.isKeyPressed('ArrowUp')) {
        gameTest.camera.instance.position.set(0, 100, 0);
        gameTest.camera.instance.lookAt(obstacle.mesh.position);
    }
    if (gameTest.input.isKeyPressed('KeyS')|| gameTest.input.isKeyPressed('ArrowDown')) {
        gameTest.camera.instance.position.set(20, 20, 30);
        gameTest.camera.instance.lookAt(obstacle.mesh.position);
    }   
}
