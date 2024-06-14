import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../../dream_Engine/Dream_Engine";

const bounceGame = new Dream_Engine();
bounceGame.camera.instance.position.set(0, 10, 20);
bounceGame.Physics.world.gravity.set(0, -9.81, 0);

// ------------------------------------------> LUCES
const ambientLight = bounceGame.Light.CreateAmbientLight('purple', 1);
const directionalLight = bounceGame.Light.CreateDirectionalLight('blue', 2);
const directionalLight2 = bounceGame.Light.CreateDirectionalLight('white', 1);

directionalLight.position.set(2, 2, 2);
directionalLight2.position.copy(directionalLight.position)

// ------------------------------------------> MATERIALES
const concreteMaterial = new CANNON.Material('concrete');
const plasticMaterial = new CANNON.Material('plastic');
const concretePlasticContact = new CANNON.ContactMaterial(concreteMaterial, plasticMaterial, 
    {
        friction: 0.1,
        restitution: 0.7
    }
)
bounceGame.Physics.world.addContactMaterial(concretePlasticContact)

// ------------------------------------------> BOLA
const bouncyBall = bounceGame.createObject("bouncyBall");
bounceGame.addComponentToObject(
    bouncyBall,
    'mesh',
    bounceGame.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1),
        new THREE.MeshStandardMaterial({ color: 'purple'})
    )
)
bounceGame.addComponentToObject(
    bouncyBall,
    'rigidbody',
    bounceGame.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1),
        material: plasticMaterial
    })
)
bouncyBall.rigidbody.addEventListener('collide', (e) => {
    console.log('bouncyBall collided with', e.body)
})
bouncyBall.rigidbody.position.set(0, 5, 0);

// ------------------------------------------> PISO Y GRID
const gridHelper = bounceGame.Mesh.CreateGridHelper(10, 10, 'gray', 'white');
gridHelper.position.y = 0.15;
const ground = bounceGame.createObject("ground");
bounceGame.addComponentToObject(
    ground,
    'mesh',
    bounceGame.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(10, 0.2, 10),
        new THREE.MeshPhongMaterial({ color: 'green', transparent: true, opacity: 1 })
    )
)
bounceGame.addComponentToObject(
    ground,
    'rigidbody',
    bounceGame.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(5, 0.1, 5)),
        material: concreteMaterial
    }
))

bounceGame.update(() => {

})

bounceGame.camera.instance.lookAt(0, 0, 0);

bounceGame.start();