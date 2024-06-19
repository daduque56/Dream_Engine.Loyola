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
dream.camera.instance.zoom = 15
dream.camera.instance.updateProjectionMatrix()
dream.Physics.world.gravity.set(0, -9.81, 0)

const ambientLight = dream.Light.CreateAmbientLight();
const directionalLight = dream.Light.CreateDirectionalLight('white', 6);
directionalLight.position.set(5, 3, 3);

const ground = dream.Mesh.CreateGridHelper();

const animationPointStart = dream.Mesh.CreateAxesHelper(3);
animationPointStart.position.set(0, 0, -3);

const animationPointEnd = dream.Mesh.CreateAxesHelper(3);
animationPointEnd.position.set(0, 0, 3);

// Dimensiones del RigidBody deL Wizard
let WizBox = new CANNON.Vec3(1.5, 3, 1);

// Objeto que controla el movimiento con animación gsap
let cube = dream.createObject('cube');
dream.scene.add(cube);

// Crear objeto Wiz para registar el Rigidbody del Wizard
let Wiz = dream.createObject('Wiz');
dream.addComponentToObject(
    Wiz,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(WizBox.x, WizBox.y, WizBox.z),
        new THREE.MeshBasicMaterial({ color: 'green', wireframe: true, transparent: true, opacity: 0.7})
    )
)
dream.addComponentToObject(
    Wiz,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(WizBox),
    })
)
Wiz.rigidbody.position.set(0, 1.75, 0);

cube.position.set(0, 0, 0);

let Wizard = null

gltfLoader.load(
    '/Models/Wizard/Wizard.gltf',
     (gltf) => {
        console.log('success loading Wizard')
        //console.log(gltf)
        gltf.scene.scale.set(1, 1.2, 1)
        gltf.scene.rotation.y = Math.PI / 2
        gltf.scene.position.set(0, 0.2, 0)
        Wizard = gltf.scene
        dream.scene.add(Wizard) 
})

// ----------------------------------------------------------------->> COPCAR 

// Modelo de la copCar
let copCar = null;
// Crear objeto copCarCube para registar el Rigidbody del copCar
let copCarCube = dream.createObject('copCarCube');
dream.scene.add(copCarCube);
let copCarBox = new CANNON.Vec3(6, 1.5, 3.5);

gltfLoader.load(
    'Models/PoliceCar/PoliceCar.gltf',
    (gltf) => {
        console.log('success loading PoliceCar')
        //console.log(gltf)
        gltf.scene.scale.set(1.5, 1.2, 1.2)
        gltf.scene.position.set(-15, -0.2, -3.5)
        gltf.scene.rotation.y = Math.PI / 2
        copCar = gltf.scene
        dream.scene.add(copCar)
    })

dream.addComponentToObject(
    copCarCube,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(copCarBox.x, copCarBox.y, copCarBox.z),
        new THREE.MeshBasicMaterial({ color: 'red', wireframe: true, transparent: true, opacity: 0.6})
    )
)
dream.addComponentToObject(
    copCarCube,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(copCarBox),
    })
)
copCarCube.rigidbody.position.set(-15, 1, -3.5);

//console.log('Wizard pos: '+ Wizard.position +" // Cube pos: "+ cube.position);


dream.update = (dt) => {

    let animAdelante = gsap.to(cube.position,
        {duration: 0.25,
            x: 0,
            y: 0,
            z: "-=3",
            ease: "back.inOut(1.7)",
            paused: true
        }, 
    );
    let animAdelanteBox = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            x: 0,
            y: Wiz.rigidbody.position.y,
            z: "-=3",
            ease: "back.inOut(1.7)",
            paused: true
        },     
    );
    let animAtras = gsap.to(cube.position,
        {duration: 0.25,
            x: 0,
            y: 0,
            z: "+=3",
            ease: "back.inOut(1.7)",
            paused: true
        }
    ); 
    let animAtrasBox = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            x: 0,
            y: Wiz.rigidbody.position.y,
            z: "+=3",
            ease: "back.inOut(1.7)",
            paused: true
        }
    ); 

    if (dream.input.isKeyPressed('KeyW')) {
        animAdelante.invalidate();
        animAdelanteBox.invalidate();
        animAdelante.restart();
        animAdelanteBox.restart();
    }
    if (dream.input.isKeyPressed('KeyS')) {
        animAtras.invalidate();
        animAtrasBox.invalidate();
        animAtras.restart();
        animAtrasBox.restart();
    }
    Wizard.position.z = cube.position.z;
    copCar.position.x = copCarCube.rigidbody.position.x;
    //copCarCube.rigidbody.position.x += dt * 3;

/*Wizard.position.z -= dt * 0.5;
console.log(Wizard.position.z);*/

}

dream.start()