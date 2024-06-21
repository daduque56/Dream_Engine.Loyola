import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es'
import Dream_Engine from '../../dream_Engine/Dream_Engine';
import gsap from 'gsap';

//------------------------------------------------->> SETUP 

const crossy_Game = new Dream_Engine();
crossy_Game.Physics.world.gravity.set(0, -9.81, 0)
const worldCenter = crossy_Game.Mesh.CreateAxesHelper(5);
worldCenter.name = "worldCenter";
worldCenter.position.set(0, 0, 0);

/*const marcadorSalto = crossy_Game.Mesh.CreateAxesHelper(3)
marcadorSalto.position.set(0, 0, -3.5)*/

const grid = crossy_Game.Mesh.CreateGridHelper(10, 10);

//------------------------------------------------>> CAMARA Y LUCES

crossy_Game.camera.instance.position.set(200,203, 200);
crossy_Game.camera.instance.rotation.order = 'YXZ';
crossy_Game.camera.instance.rotation.y = Math.PI / 4;
crossy_Game.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
crossy_Game.camera.instance.zoom = 10
crossy_Game.camera.instance.updateProjectionMatrix()

const ambientLight = crossy_Game.Light.CreateAmbientLight();
crossy_Game.scene.add(ambientLight);

const Light = crossy_Game.Light.CreateDirectionalLight('white', 6);
Light.position.set(0, 10, 0);   
//const lightHelper = crossy_Game.Light.CreateDirectionalLightHelper(Light);

//------------------------------------------------>> TEXTURAS

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => 
{
    console.log('loading started');
}
loadingManager.onLoad = () =>{
    console.log('loading finished');
}
loadingManager.onProgress = () =>{
    console.log('loading progressing');
}
loadingManager.onError = () =>{
    console.log('loading error');
}
const textureLoader = new THREE.TextureLoader(loadingManager);

//------------------------------------------------>> MODELOS 

const gltfLoader = new GLTFLoader()

// WIZARD
let Wizard = crossy_Game.createObject('Wizard')

/*crossy_Game.addComponentToObject(
    Wizard,
    'rigidbody',
    crossy_Game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    })
)*/

gltfLoader.load(
    '/Models/Wizard/Wizard.gltf',
     (gltf) => {
        console.log('success loading Wizard')
        //console.log(gltf)
        gltf.scene.scale.set(1, 1.2, 1)
        gltf.scene.rotation.y = -Math.PI / 1
        gltf.scene.position.set(0, 0.2, 0)
        Wizard = gltf.scene
        crossy_Game.scene.add(Wizard) 
    })



// ROAD

let road = crossy_Game.createObject('Road')

crossy_Game.addComponentToObject(
    road,
    'rigidbody',
    crossy_Game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(20, 0.01, 2))
    })
)

gltfLoader.load(
    'Models/Road/Road.gltf',
    (gltf) => {
        console.log('success loading Road')
        //console.log(gltf)
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.rotation.y = Math.PI / 2
        gltf.scene.position.set(0, -0.15, -4)
        road = gltf.scene
        crossy_Game.scene.add(road)
    })

// COIN
let coin = crossy_Game.createObject('Coin')

crossy_Game.addComponentToObject(
    coin,
    'rigidbody',
    crossy_Game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.2, 0.5))
    })
)

gltfLoader.load(
    'Models/coin.gltf/coin.gltf',
    (gltf) => {
        console.log('success loading coin')
        //console.log(gltf)
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(0, 0.2, -8)
        coin = gltf.scene
        crossy_Game.scene.add(coin)
    })

// POLICE CAR
let PoliceCar = crossy_Game.createObject('PoliceCar')

gltfLoader.load(
    'Models/PoliceCar/PoliceCar.gltf',
    (gltf) => {
        console.log('success loading PoliceCar')
        //console.log(gltf)
        gltf.scene.scale.set(1.5, 1.2, 1.2)
        gltf.scene.position.set(-5, -0.2, -3.5)
        gltf.scene.rotation.y = Math.PI / 2
        PoliceCar = gltf.scene
        crossy_Game.scene.add(PoliceCar)
    })


// CAR2

let car2 = crossy_Game.createObject('Car2')

// CAR3

let car3 = crossy_Game.createObject('Car3')

// CAR4

let car4 = crossy_Game.createObject('Car4')

// LOG

let log = crossy_Game.createObject('Log')

// STOPSIGN

let stopSign = crossy_Game.createObject('StopSign')

//------------------------------------------------>> ANIMACIONES

let movW = gsap.to(Wizard.position.z,
     {duration: 0.5,
         x: 0,
         y: 0,
         z: "-=2.8",
         paused: true
        }
);

//------------------------------------------------>> SONIDOS

//------------------------------------------------>> EXTRAS AL SETUP

//----------------------------------------------------------------------->> FUNCIONES

// FUNCION SPAWNEAR OBJETOS
function createModel(name, modelPath, scale, rotation, geometry, material, physics, position) {
    let object3D = null;
    let objectCube = crossy_Game.createObject(name);
    crossy_Game.scene.add(objectCube);

    gltfLoader.load(
        modelPath,
        (gltf) => {
            console.log(`success loading ${name}`);
            gltf.scene.scale.set(...scale);
            gltf.scene.rotation.y = rotation;
            object3D = gltf.scene;
            crossy_Game.scene.add(object3D);
        }
    );
    crossy_Game.addComponentToObject(
        objectCube,
        'mesh',
        crossy_Game.Mesh.CreateFromGeometry(
            new THREE.BoxGeometry(...geometry),
            new THREE.MeshBasicMaterial(material)
        )
    );
    crossy_Game.addComponentToObject(
        objectCube,
        'rigidbody',
        crossy_Game.Physics.CreateBody(physics)
    );
    objectCube.rigidbody.position.set(...position);

    function updatePosition() {
        if (object3D && objectCube.rigidbody) {
            object3D.position.copy(objectCube.rigidbody.position);
            object3D.position.y -= 1;
        }
        requestAnimationFrame(updatePosition);
    }

    updatePosition();

    return objectCube;
}
// SPAWNEAR ROAD EN START
const floor = crossy_Game.createObject
crossy_Game.addComponentToObject(
    floor,
    'mesh',
    crossy_Game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(100, 0.01, 2),
        new THREE.MeshStandardMaterial({color: 'red'})
    ),
    
)
/crossy_Game.addComponentToObject(
    floor,
    'rigidbody',
    crossy_Game.Physics.CreateBody({
        mass: 5,
        shape: new CANNON.Box(new CANNON.Vec3(100, 0.01, 2))
    })
)
console.log(floor.rigidbody)
floor.mesh.position.set(0, 0, 0)

const floor3 = crossy_Game.createObject
crossy_Game.addComponentToObject(
    floor3,
    'mesh',
    crossy_Game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(100, 0.01, 2),
        new THREE.MeshStandardMaterial({color: 'green'})
    ),
    
)
floor3.mesh.position.set(0, 0, -8)

// SPAWNEAR WIZARD EN START

// START GAME

//------------------------------------------------>> LOOP

// LOOP DE SPAWNEAR ROAD YA EN PLAY INFINITAMENTE

// SPAWNEAR COINS EN ROAD

// SPAWNEAR CARROS EN ROAD

const vehicleParams = [
  {
    name: 'ambulance',
    modelPath: 'Models/Ambulance/Ambulance.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'purple', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 3)) },
    position: [0, 0, 0]
  },
  {
    name: 'policeCar',
    modelPath: 'Models/PoliceCar/PoliceCar.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'blue', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)) },
    position: [0, 0, 0]
  },
  {
    name: 'fireTruck',
    modelPath: 'Models/FireTruck/FireTruck.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'red', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 3)) },
    position: [0, 0, 0]
  },
  {
    name: 'Taxi',
    modelPath: 'Models/Taxi/Taxi.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'yellow', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)) },
    position: [0, 0, 0]
  },
  {
    name: 'hatchBack',
    modelPath: 'Models/HatchBack/HatchBack.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'gray', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)) },
    position: [0, 0, 0]
  }
]
function spawnVehicle(params, spawnerIndex) {
  const spawnPosition = spawnerPositions[spawnerIndex]
  const vehicle = createModel(
    params.name,
    params.modelPath,
    params.scale,
    params.rotation,
    params.geometry,
    params.material,
    params.physics,
    spawnPosition
  )
  crossy_Game.scene.add(vehicle)

  // Remove the vehicle after 5 seconds
  setTimeout(() => {
    crossy_Game.scene.remove(vehicle)
    crossy_Game.physicsWorld.remove(vehicle.body)
  }, 5000)
}

// SPAWNEAR LOGS EN RIVER

// SPAWNEAR STOP SIGNS EN ROAD

// CONTADOR DISTANCIA RECORRIDA

// CONTADOR MONEDAS

//------------------------------------------------>> EVENTOS

// WIZARD ATROPALLADO POR CARRO 

// WIZARD CAE AL AGUA 

// WIZARD RECOGE MONEDA

//------------------------------------------------>> UPDATE Y START

let objects = crossy_Game.getObjects();
for(let obj of objects) {
    console.log(objects[0], obj.name); 
}

crossy_Game.update = (dt) => {

    //Wizard.position.z -= 0.01

//------------------------------------------------>> ANIMACIONES UPDATE
    if (crossy_Game.input.isKeyPressed('KeyW')) {
        movW.invalidate();
        movW.restart();
        console.log('Final position is: ', Wizard.position.z);
    }
}

crossy_Game.start();