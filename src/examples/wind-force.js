import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const gameTest = new Dream_Engine();
gameTest.camera.instance.position.set(8 , 20, 40)
//gameTest.Physics.world.gravity.set(0, -9.81, 0);

///////----> Creating the lights <----///////

const ambientLight = gameTest.Light.CreateAmbientLight('white', 1);
const directionalLight = gameTest.Light.CreateDirectionalLight('white', 1);
gameTest.scene.instance.add(ambientLight, directionalLight);

///////----> Creating the floor <----///////

const floor = gameTest.createObject("floor");

gameTest.addComponentToObject(
    floor,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(80, 80),    
        new THREE.MeshStandardMaterial({ color: 'darkslategray' })
    )
)
gameTest.addComponentToObject(
    floor,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Plane(),
        velocity: new CANNON.Vec3(0, 0, 0)
    })
)
floor.mesh.rotation.x = -Math.PI / 2

gameTest.camera.instance.lookAt(floor.position)

///////----> Creating the spheres <----///////

///////----> Small Sphere

const smallSphere = gameTest.createObject();
gameTest.addComponentToObject(
    smallSphere,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'red' })
    )
)
gameTest.addComponentToObject(
    smallSphere,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 10,
        shape: new CANNON.Sphere(1)
    })
)
const smallSphereHelper = gameTest.Mesh.CreateAxesHelper(1.5)
smallSphere.mesh.add(smallSphereHelper)
smallSphere.mesh.position.set(-8, 2, 8)
smallSphere.rigidbody.velocity.set(0, 0, 0)

///////----> Big Sphere

const bigSphere = gameTest.createObject();
gameTest.addComponentToObject(
    bigSphere,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(2, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'blue' })
    )
)
gameTest.addComponentToObject(
    bigSphere,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 20,
        shape: new CANNON.Sphere(1)
    })
)
const bigSphereHelper = gameTest.Mesh.CreateAxesHelper(3)
bigSphere.mesh.add(bigSphereHelper)
bigSphere.mesh.position.set(-4, 3, 8)
bigSphere.rigidbody.velocity.set(0, 0, 0)


gameTest.start()

gameTest.update = (dt) => {
    smallSphere.mesh.position.copy(smallSphere.rigidbody.position)
    bigSphere.mesh.position.copy(bigSphere.rigidbody.position)
    
    console.log(smallSphere.rigidbody.velocity, bigSphere.rigidbody.velocity)
    smallSphere.rigidbody.applyForce(new CANNON.Vec3(0, 0, 0))
    bigSphere.rigidbody.applyForce(new CANNON.Vec3(0, 0, 0))
}

console.log(console.log(gameTest.getObjects())
)