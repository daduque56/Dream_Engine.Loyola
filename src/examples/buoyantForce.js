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

const gridHelper = game.Mesh.CreateGridHelper(100, 10, 'gray', 'white');
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
            
            // Volumen de una esfera
            const volume = 4/3 * Math.PI * Math.pow(1, 3);

            // Densidad de en donde es sumergido el volumen
            const buoyantForce = game.Forces.GenerateBuoyantForce(0.35, volume, 9.81); 
            ball.rigidbody.applyForce(buoyantForce);

            // Fuerza de arrastre
            const dampingForce = game.Forces.GenerateDampingForce(0.5, ball.rigidbody.velocity);
            ball.rigidbody.applyForce(dampingForce);

            // Simulación de estado de descanso
            if (ball.rigidbody.velocity.length() < 0.01) {
                ball.rigidbody.velocity.set(0, 0, 0);
            }
        }
    } else {
       // ball.rigidbody.velocity.set(0,0,0);
    }
}
