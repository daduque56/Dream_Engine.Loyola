import * as THREE from 'three'  
import gsap from 'gsap'
import Dream_Engine from '../../dream_Engine/Dream_Engine'
import * as CANNON from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const dream = new Dream_Engine();

const worldCenter = dream.Mesh.CreateAxesHelper(3);
worldCenter.name = "worldCenter";
worldCenter.position.set(0, 0, 0); 

dream.Physics.world.gravity.set(0, -9.81, 0)

const gltfLoader = new GLTFLoader();

//------------------------------------------------>> CAMARA Y LUCES

dream.camera.instance.position.set(200,203, 200);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream.camera.instance.zoom = 20
dream.camera.instance.updateProjectionMatrix()
dream.Physics.world.gravity.set(0, -9.81, 0)

const ambientLight = dream.Light.CreateAmbientLight();
const directionalLight = dream.Light.CreateDirectionalLight('white', 6);
directionalLight.position.set(5, 3, 3);

const ground = dream.Mesh.CreateGridHelper(10 , 10 , 'gray', 'gray');
ground.position.set(0, 0, 0);

const animationPointStart = dream.Mesh.CreateAxesHelper(3);
animationPointStart.position.set(0, 0, -3);

const animationPointEnd = dream.Mesh.CreateAxesHelper(3);
animationPointEnd.position.set(0, 0, 3);

// Dimensiones del RigidBody deL Wizard
let WizBox = new CANNON.Vec3(1, 1, 1);

// Crear objeto Wiz para registar el Rigidbody del Wizard
let Wiz = dream.createObject('Wiz');
dream.addComponentToObject(
    Wiz,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 3.5, 1),
        new THREE.MeshBasicMaterial({ color: 'green', wireframe: true, transparent: true, opacity: 0.7})
    )
)
dream.addComponentToObject(
    Wiz,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(WizBox.x, WizBox.y, WizBox.z)),
    })
)
Wiz.rigidbody.position.set(0, 1, 0);

//cube.position.set(0, 0, 0);

let Wizard = null

gltfLoader.load(
    '/Models/Wizard/Wizard.gltf',
     (gltf) => {
        console.log('success loading Wizard')
        //console.log(gltf)
        gltf.scene.scale.set(1, 1.2, 1)
        //gltf.scene.rotation.y = Math.PI / 2
        Wizard = gltf.scene
        dream.scene.add(Wizard) 
})

Wiz.rigidbody.position.set(0, 5, 0);

// ----------------------------------------------------------------->> COPCAR 

// Modelo de la copCar
let copCar = null;
// Crear objeto copCarCube para registar el Rigidbody del copCar
let copCarCube = dream.createObject('copCarCube');
dream.scene.add(copCarCube);

gltfLoader.load(
    'Models/PoliceCar/PoliceCar.gltf',
    (gltf) => {
        console.log('success loading PoliceCar')
        //console.log(gltf)
        gltf.scene.scale.set(1.5, 1.2, 1.2)
        gltf.scene.rotation.y = Math.PI / 2
        copCar = gltf.scene
        dream.scene.add(copCar)
    })

dream.addComponentToObject(
    copCarCube,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(5.5, 1.5, 3),
        new THREE.MeshBasicMaterial({ color: 'red', wireframe: true, transparent: true, opacity: 0.6})
    )
)
dream.addComponentToObject(
    copCarCube,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 1)),
    })
)
copCarCube.rigidbody.position.set(-10, 0.8, 0);

// ----------------------------------------------------------------->> PHYSICS TESTS
let floorBox = new CANNON.Vec3(10, 0.1, 10);

const floor = dream.createObject('floor');
dream.addComponentToObject(
    floor,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(30, 30, 10, 10),
        new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false, transparent: true, opacity: 0.2})
    )
)
dream.addComponentToObject(
    floor,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Plane(),
    })
)
floor.rigidbody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
floor.rigidbody.position.set(0, 0, 0);

console.log(dream.objects)



dream.update = (dt) => {

    let animAdelante = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            z: "-=3",
            ease: "back.inOut(1.7)",
            paused: true
        },     
    );
    let animAtras = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            z: "+=3",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let animDerecha = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            x: "+=3.0",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let animIzquierda = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            x: "-=3.0",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    if (dream.input.isKeyPressed('KeyW')) {
        animAdelante.invalidate();
        animAdelante.restart();
    }
    if (dream.input.isKeyPressed('KeyS')) {
        animAtras.invalidate();
        animAtras.restart();
    }
    if (dream.input.isKeyPressed('KeyD')) {
        animDerecha.invalidate();
        animDerecha.restart();
    }
    if (dream.input.isKeyPressed('KeyA')) {
        animIzquierda.invalidate();
        animIzquierda.restart();
    }
    
    Wizard.position.copy(Wiz.rigidbody.position)
    Wizard.position.y -= 1;
    Wizard.quaternion.copy(Wiz.rigidbody.quaternion)
    Wizard.rotation.y = Math.PI
    
    copCar.position.copy(copCarCube.rigidbody.position)
    copCar.position.y -= 1;

    //copCarCube.rigidbody.position.x += dt * 3;

}

dream.start()