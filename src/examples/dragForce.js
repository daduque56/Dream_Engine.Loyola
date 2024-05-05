import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const game = new Dream_Engine();
game.camera.instance.position.set(20, 30, 70);

const ambientLight = game.Light.CreateAmbientLight('white', 1);
ambientLight.castShadow = false;
const directionalLight = game.Light.CreateDirectionalLight('white', 1);
directionalLight.castShadow = false;
game.scene.instance.add(ambientLight, directionalLight);

const ball = game.createObject();
game.addComponentToObject(
    ball,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(2, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'gold' })
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

const ballHelper = game.Mesh.CreateArrowHelper(new THREE.Vector3(0, -40, 0), new THREE.Vector3(0, 0, 0), 4, 'red');
const ballAxisHelper = game.Mesh.CreateAxesHelper(5);
ballAxisHelper.rotateY(Math.PI / -2);
ball.mesh.add(ballHelper, ballAxisHelper);

const gridHelper = game.Mesh.CreateGridHelper(100, 10, 'darkslategray', 'darkslategray');
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
            console.log('The ball entered the water');
            const dragForce = game.Forces.GenerateDrag(1, ball.rigidbody.velocity);
            ball.rigidbody.applyForce(dragForce);
        }
    } else {
        ball.rigidbody.velocity.set(0,0,0);
         console.log('The ball reached the bottom')
    }
   
}