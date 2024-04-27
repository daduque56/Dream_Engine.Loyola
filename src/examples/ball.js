import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from '../dream_Engine/Dream_Engine';

const game = new Dream_Engine();
game.camera.instance.position.set(8 , 20, 40)

game.camera.instance.rotation.order = 'YXZ';
game.camera.instance.rotation.y = Math.PI / 4;
game.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  

game.camera.instance.zoom = 1
game.camera.instance.updateProjectionMatrix()


game.Physics.world.gravity.set(0, -9.81, 0);

const ambientLight = new THREE.AmbientLight('white', 1);
const directionalLight = new THREE.DirectionalLight('white', 1);
directionalLight.position.set(10, 10, 10);
directionalLight.shadow.camera.near = 0;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.top = 40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.bottom = -40;
directionalLight.shadow.camera.left = -40;

const ball = game.createObject();
game.addComponentToObject(
    ball,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'crimson' })
    )
)

game.addComponentToObject(
    ball,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1),
    })
)
ball.position.set(-8, 1, 8)
ball.rigidbody.velocity.set(10, 15, -10)

const floor = game.createObject("floor");
game.addComponentToObject(
    floor,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({ color: 'darkslategray' })
    )
)
game.camera.instance.lookAt(floor.position)
game.scene.instance.add(floor, ambientLight, directionalLight, ball);
floor.rotateX(-Math.PI / 2)

game.start();