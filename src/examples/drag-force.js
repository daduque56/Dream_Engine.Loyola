import * as THREE from 'three'; 
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const gameTest = new Dream_Engine();
gameTest.camera.instance.position.set(20, 30, 70);
gameTest.Physics.world.gravity.set(0, -9.81, 0);

const ambientLight = gameTest.Light.CreateAmbientLight('white', 1);
const directionalLight = gameTest.Light.CreateDirectionalLight('white', 1, new THREE.Vector3(1, 1, 1));

const ball = gameTest.createObject();
gameTest.addComponentToObject(
    ball,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'green' })
    )
)
gameTest.addComponentToObject(
    ball,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mesh: 1,
        shape: new CANNON.Sphere(1),
    })
)
ball.rigidbody.position.set(0, 20, 0);

const grideHelper = gameTest.Mesh.CreateGridHelper(100, 10, 'darkslategarys', 'darkslategarys');
const waterCube = gameTest.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(30, 10, 25),
    new THREE.MeshStandardMaterial({ color: 'darkblue', transparent: true, opacity: 0.7 })
)
waterCube.position.y = 5;

gameTest.scene.add(ambientLight, directionalLight, grideHelper, waterCube);

gameTest.camera.instance.lookAt(waterCube.position);

gameTest.start();

gameTest.update = () => {
    ball.mesh.position.copy(ball.rigidbody.position);
    ball.rigidbody.applyForce(new CANNON.Vec3(0, -9.81, 0));
    if (ball.position.y < 0){
        ball.rigidbody.applyForce(new CANNON.Vec3(0, -9.81, 0));
        if (ball.position.y <= 10){
            console.log('Ball is in the water');
            const dragForce = gameTest.Forces.GenerateDrag(1, ball.rigidbody.velocity);
            ball.rigidbody.applyForce(dragForce);
        }
    } else {
        ball.rigidbody.velocity.set(0, 0, 0);
    }
    console.log(ball.rigidbody.velocity.y, ball.rigidbody.force.y);   
}