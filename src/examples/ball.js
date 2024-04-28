import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from '../dream_Engine/Dream_Engine';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const game = new Dream_Engine();
game.camera.instance.position.set(8 , 20, 40)
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

game.camera.instance.zoom = 0.5
game.camera.instance.updateProjectionMatrix()

// Creating a ball with a mesh and a rigid body
const ball = game.createObject();
game.addComponentToObject(
    ball,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'purple' })
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
game.Physics.world.addBody(ball.rigidbody);

const ballMeshHelper = game.Mesh.CreateAxesHelper(2)

ball.mesh.add(ballMeshHelper)
ball.rigidbody.velocity.set(5, 25, -15)
ball.mesh.position.copy(ball.rigidbody.position)

game.scene.instance.add(ambientLight, directionalLight);

///////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
const suelo = game.createObject("suelo");   
game.addComponentToObject(
    suelo,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(200, 200, 200),
        new THREE.MeshBasicMaterial({ color: 'green', wireframe: false})
    )
)

suelo.mesh.rotateX(-Math.PI / 2)
suelo.mesh.position.set(0,0,0)

//////////////////////////////////////////////////////////////////

game.update = (dt) => {
    ball.mesh.position.copy(ball.position)
    ball.mesh.quaternion.copy(ball.quaternion)

    //console.log(ball.position)

    game.camera.instance.lookAt(0,0,0)
    game.Physics.world.step(dt)
    

}

game.start();
