import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const collisionGame = new Dream_Engine();
collisionGame.camera.instance.position.set(0, 10, 20);
collisionGame.Physics.world.gravity.set(0, -9.81, 0);

const ambientLight = collisionGame.Light.CreateAmbientLight('white', 0.5);
const directionalLight = collisionGame.Light.CreateDirectionalLight('white', 0.7);

const ball = collisionGame.createObject();
collisionGame.addComponentToObject(
    ball,
    'mesh',
    collisionGame.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1),
        new THREE.MeshStandardMaterial({ color: 'crimson'})
    )
)
collisionGame.addComponentToObject(
    ball,
    'rigidbody',
    collisionGame.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1)
    })
)
ball.position.set(0, 20, 0);

const floor = collisionGame.createObject();
collisionGame.addComponentToObject(
    floor,
    'rigidbody',
    collisionGame.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Plane()
    })
)
collisionGame.addComponentToObject(
    floor,
    'mesh',
    collisionGame.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(15, 10),
        new THREE.MeshPhongMaterial({ color: 'darkslategray' })
    )
)
collisionGame.camera.instance.lookAt(0,0,0);
floor.mesh.rotation.x = -Math.PI / 2;

const plano = collisionGame.createObject();
collisionGame.addComponentToObject(
    plano,
    'mesh',
    collisionGame.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(15, 15),
        new THREE.MeshPhongMaterial({ color: 'royalblue' })
    )
)

plano.position.set(0, 0, 0);
plano.mesh.rotateX(-Math.PI / 2);

collisionGame.start();