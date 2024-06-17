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

const marcadorSalto = crossy_Game.Mesh.CreateAxesHelper(3)
marcadorSalto.position.set(0, 0, -3.5)

const grid = crossy_Game.Mesh.CreateGridHelper(100, 100);

//------------------------------------------------>> CAMARA Y LUCES

crossy_Game.camera.instance.position.set(200,203, 200);
crossy_Game.camera.instance.rotation.order = 'YXZ';
crossy_Game.camera.instance.rotation.y = Math.PI / 4;
crossy_Game.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
crossy_Game.camera.instance.zoom = 25
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

crossy_Game.addComponentToObject(
    Wizard,
    'rigidbody',
    crossy_Game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    })
)

gltfLoader.load(
    '/Models/Wizard/Wizard.gltf',
     (gltf) => {
        console.log('success loading Wizard')
        //console.log(gltf)
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.rotation.y = -Math.PI / 1
        //gltf.scene.position.set(0, 0.2, 0)
        gltf.scene.position.copy(Wizard.rigidbody.position)
        Wizard = gltf.scene
        crossy_Game.scene.add(Wizard) 
    })



// ROAD

let road = crossy_Game.createObject('Road')

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
        gltf.scene.position.set(0, 0.2, -7)
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

let movW = gsap.to(coin.rigidbody.position,
     {duration: 0.5,
         x: 0,
         y: 0,
         z: "-=2.8",
         paused: true
        }
);

//------------------------------------------------>> SONIDOS

//------------------------------------------------>> EXTRAS AL SETUP

//------------------------------------------------>> FUNCIONES

// SPAWNEAR ROAD EN START

const floor = crossy_Game.createObject
crossy_Game.addComponentToObject(
    floor,
    'mesh',
    crossy_Game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(20, 0.01, 2),
        new THREE.MeshStandardMaterial({color: 'green'})
    ),
    
)
floor.mesh.position.set(0, 0, 0)

const floor2 = crossy_Game.createObject
crossy_Game.addComponentToObject(
    floor,
    'mesh',
    crossy_Game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(20, 0.01, 5),
        new THREE.MeshStandardMaterial({color: 'gray'})
    ),
    
)
floor2.mesh.position.set(0, 0, -3.5)

const floor3 = crossy_Game.createObject
crossy_Game.addComponentToObject(
    floor,
    'mesh',
    crossy_Game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(20, 0.01, 2),
        new THREE.MeshStandardMaterial({color: 'green'})
    ),
    
)
floor3.mesh.position.set(0, 0, -7)

// SPAWNEAR CHICKEN EN START

// START GAME

//------------------------------------------------>> LOOP

// LOOP DE SPAWNEAR ROAD YA EN PLAY INFINITAMENTE

// SPAWNEAR COINS EN ROAD

// SPAWNEAR CARROS EN ROAD

// SPAWNEAR LOGS EN RIVER

// SPAWNEAR STOP SIGNS EN ROAD

// CONTADOR DISTANCIA RECORRIDA

// CONTADOR MONEDAS

//------------------------------------------------>> EVENTOS

// CHICKEN ATROPALLADO POR CARRO 

// CHICKEN CAE AL AGUA 

// CHICKEN RECOGE MONEDA

//------------------------------------------------>> UPDATE Y START

let objects = crossy_Game.getObjects();
for(let obj of objects) {
    console.log(objects[0], obj.name); 
}

crossy_Game.update = (dt) => {

//------------------------------------------------>> ANIMACIONES UPDATE
        if (crossy_Game.input.isKeyPressed('KeyW')) {
        movW.invalidate();
        movW.restart();
    }
}

crossy_Game.start();