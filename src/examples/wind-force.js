import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const gameTest = new Dream_Engine();
gameTest.camera.instance.position.set(8 , 20, 40)

///////----> Creating the lights <----///////
// ----------------------------------------------------------------------------> Changes started here
const ambientLight = gameTest.Light.CreateAmbientLight('white', 1);
const directionalLight = gameTest.Light.CreateDirectionalLight('white', 1);
ambientLight.castShadow = true;
directionalLight.castShadow = true;
directionalLight.position.set(9, 9, 9)
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.camera.left = -20;
gameTest.scene.instance.add(ambientLight, directionalLight);

///////----> Creating the floor <----///////

const floor = gameTest.createObject("floor");
gameTest.addComponentToObject(
    floor,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(100, 100),    
        new THREE.MeshStandardMaterial({ color: 'sienna' })
    )
)
floor.mesh.receiveShadow = true;
floor.mesh.rotation.x = (-Math.PI / 2);

gameTest.camera.instance.lookAt(floor.position)

///////----> Creating the spheres <----///////

///////----> Small Sphere

const smallSphere = gameTest.createObject();
gameTest.addComponentToObject(
    smallSphere,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'royalblue' })
    )
)
gameTest.addComponentToObject(
    smallSphere,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1)
    })
)
smallSphere.mesh.castShadow = true;
smallSphere.rigidbody.position.set(-8, 1, 8)
smallSphere.rigidbody.velocity.set(0, 0, -2)

const smallSphereHelper = gameTest.Mesh.CreateAxesHelper(1.5)
smallSphere.mesh.add(smallSphereHelper)

///////----> Big Sphere

const bigSphere = gameTest.createObject();
gameTest.addComponentToObject(
    bigSphere,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(2, 32, 16),
        new THREE.MeshStandardMaterial({ color: 'gold' })
    )
)
gameTest.addComponentToObject(
    bigSphere,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 2,
        shape: new CANNON.Sphere(1)
    })
)
bigSphere.mesh.castShadow = true;
bigSphere.rigidbody.position.set(-4, 2, 8);
bigSphere.rigidbody.velocity.set(0, 0, 2)  

const bigSphereHelper = gameTest.Mesh.CreateAxesHelper(3)
bigSphere.mesh.add(bigSphereHelper)

gameTest.camera.instance.lookAt(floor.mesh.position)

gameTest.start()

gameTest.update = (dt) => {
    
    smallSphere.mesh.position.copy(smallSphere.rigidbody.position)
    bigSphere.mesh.position.copy(bigSphere.rigidbody.position)

    console.log(smallSphere.rigidbody.velocity, bigSphere.rigidbody.velocity)
    smallSphere.rigidbody.applyForce(new CANNON.Vec3(1, 0, 0))
    bigSphere.rigidbody.applyForce(new CANNON.Vec3(0, 0, 0))
}

console.log(console.log(gameTest.getObjects())
)