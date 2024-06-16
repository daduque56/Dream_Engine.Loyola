import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es'
import Dream_Engine from '../../dream_Engine/Dream_Engine';

//------------------------------------------------->> SETUP 

const crossy_Game = new Dream_Engine();
crossy_Game.Physics.world.gravity.set(0, -9.81, 0)
const worldCenter = crossy_Game.Mesh.CreateAxesHelper();
worldCenter.name = "worldCenter";
worldCenter.position.set(0, 0, 0);  

//------------------------------------------------>> CAMARA Y LUCES

crossy_Game.camera.instance.position.set(200,203, 200);
crossy_Game.camera.instance.rotation.order = 'YXZ';
crossy_Game.camera.instance.rotation.y = Math.PI / 4;
crossy_Game.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
crossy_Game.camera.instance.zoom = 15
crossy_Game.camera.instance.updateProjectionMatrix()

const ambientLight = crossy_Game.Light.CreateAmbientLight();
crossy_Game.scene.add(ambientLight);

const Light = crossy_Game.Light.CreateDirectionalLight('white', 6);
Light.position.set(0, 10, 0);   
const lightHelper = crossy_Game.Light.CreateDirectionalLightHelper(Light);

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

// CHICKEN

let chicken = crossy_Game.createObject('Chicken')

// ROAD

let road = crossy_Game.createObject('Road')

// COIN

let coin = crossy_Game.createObject('Coin')

// CAR1

let car1 = crossy_Game.createObject('Car1')

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

//------------------------------------------------>> SONIDOS

//------------------------------------------------>> EXTRAS AL SETUP

//------------------------------------------------>> FUNCIONES

// SPAWNEAR ROAD EN START

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
    
}

crossy_Game.start();