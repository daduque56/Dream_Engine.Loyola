import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const game = new Dream_Engine();
game.camera.instance.position.set(20, 30, 70);

const ambientLight = game.Light.CreateAmbientLight('white', 1);
const directionalLight = game.Light.CreateDirectionalLight('white', 1);

const ball = game.createObject();
game.addComponentToObject(
    ball,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(2, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'crimson' })
    )
)
game.addComponentToObject(
    ball,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1),
        velocity: new CANNON.Vec3(0, -9.81, 0)
    })
)
ball.rigidbody.position.set(0, 20, 0);
game.camera.instance.lookAt(ball.position);

const gridHelper = game.Mesh.CreateGridHelper(100, 10, 'darkslategrays', 'darkslategrays');
const waterCube = game.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(30, 10, 25),
    new THREE.MeshStandardMaterial({ color: 'darkblue', transparent: true, opacity: 0.7 })
)
waterCube.position.y = 5;

game.start();

game.update = (dt) => {

    ball.mesh.position.copy(ball.rigidbody.position);
    if (ball.position.y > 0){
        ball.rigidbody.applyForce(new CANNON.Vec3(0, -9.81, 0));
        if (ball.rigidbody.position.y <= 10) {
            
            const tensionForce = game.Forces.GenerateTensionForce(1, ball.rigidbody.velocity); // Replace with the actual constant
            ball.rigidbody.applyForce(tensionForce);
        }
    } else {
        ball.rigidbody.velocity.set(0,0,0);
    }
}
