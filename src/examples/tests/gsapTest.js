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

dream.camera.instance.position.set(200,203, 186);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
// Zoom juego es 10
dream.camera.instance.zoom = 10
dream.camera.instance.updateProjectionMatrix()
dream.Physics.world.gravity.set(0, -9.81, 0)

const ambientLight = dream.Light.CreateAmbientLight();
const directionalLight = dream.Light.CreateDirectionalLight('white', 6);
directionalLight.position.set(5, 3, 3);

const ground = dream.Mesh.CreateGridHelper(10 , 10 , 'gray', 'gray');
ground.position.set(0, 0, 0);

const spawnPositionHelper = dream.Mesh.CreateAxesHelper(5);
spawnPositionHelper.position.set(-60, 0, -9);

// ---------------------------------------------------------->> MATERIALES

const WizMaterial = new CANNON.Material('WizMaterial');
const vehicleMaterial = new CANNON.Material('vehicleMaterial');
const obstaculoMaterial = new CANNON.Material('obstaculoMaterial');

const WizVehicleContactMaterial = new CANNON.ContactMaterial(
    WizMaterial,
    vehicleMaterial, 
    { friction: 0.5,
    restitution: 1,
});
dream.Physics.world.addContactMaterial(WizVehicleContactMaterial);

// ----------------------------------------------------------------->> FUNCIONES
/* INTENTO DE CREACIÓN DE MODELOS CON ARRAY DE PARAMETROS 
// Parametros de los vehiculos
const vehicleParams = [
  {
    name: 'ambulance',
    modelPath: 'Models/Ambulance/Ambulance.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'purple', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 3)) }
  },
  {
    name: 'policeCar',
    modelPath: 'Models/PoliceCar/PoliceCar.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'blue', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)) }
  },
  {
    name: 'fireTruck',
    modelPath: 'Models/FireTruck/FireTruck.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'red', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 3)) }
  },
  {
    name: 'Taxi',
    modelPath: 'Models/Taxi/Taxi.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'yellow', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)) }
  },
  {
    name: 'hatchBack',
    modelPath: 'Models/HatchBack/HatchBack.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'gray', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)) }
  }
]
// Obtener parametros de vehiculo por nombre
function getVehicleParamsByName(name) {
  return vehicleParams.find(params => params.name === name)
}
function createModel(params, position) {
    let object3D = null;
    let objectCube = dream.createObject(params.name);
    dream.scene.add(objectCube);

    gltfLoader.load(
        params.modelPath,
        (gltf) => {
            console.log(`success loading ${params.name}`);
            gltf.scene.scale.set(...params.scale);
            gltf.scene.rotation.y = params.rotation;
            object3D = gltf.scene;
            dream.scene.add(object3D);
        }
    );
    dream.addComponentToObject(
        objectCube,
        'mesh',
        dream.Mesh.CreateFromGeometry(
            new THREE.BoxGeometry(...params.geometry),
            new THREE.MeshBasicMaterial(params.material)
        )
    );
    dream.addComponentToObject(
        objectCube,
        'rigidbody',
        dream.Physics.CreateBody(params.physics)
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

*/

let TrainSpeed = 50;
let vehicleSpeed = 10;
let vehicles = [];
let coins = [];
let obstacles = [];
const Modelos = [
  {
    name: 'ambulance',
    modelPath: 'Models/Ambulance/Ambulance.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'purple', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 10, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 2)), material: vehicleMaterial}
  },
  {
    name: 'policeCar',
    modelPath: 'Models/PoliceCar/PoliceCar.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'blue', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)), material: vehicleMaterial}
  },
  {
    name: 'fireTruck',
    modelPath: 'Models/FireTruck/FireTruck.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'red', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 2)), material: vehicleMaterial}
  },
  {
    name: 'Taxi',
    modelPath: 'Models/Taxi/Taxi.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'yellow', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)), material: vehicleMaterial}
  },
  {
    name: 'hatchBack',
    modelPath: 'Models/HatchBack/HatchBack.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [5.5, 1.5, 3],
    material: { color: 'gray', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(2.5, 1, 2)), material: vehicleMaterial}
  },
  {
    name: 'wizard',
    modelPath: 'Models/Wizard/Wizard.gltf',
    scale: [1, 1.2, 1],
    rotation: Math.PI / 2,
    geometry: [1, 3.5, 1],
    material: { color: 'green', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 1, shape: new CANNON.Box(new CANNON.Vec3(1, 3.5, 1)), material: WizMaterial}
  },
  {
    name: 'road',
    modelPath: 'Models/Road/Road.gltf',
    scale: [1, 1, 1],
    rotation: Math.PI / 2,
    geometry: [20, 0.01, 2],
    material: { color: 'gray', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(20, 0.01, 2)) }
  },
  {
    name: 'train',
    modelPath: 'Models/Train/Train.gltf',
    scale: [1, 1, 1],
    rotation: Math.PI / 2,
    geometry: [1, 1, 3],
    material: { color: 'gray', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 3)), material: vehicleMaterial }
  },
  {
    name: 'log',
    modelPath: 'Models/Log/Log.gltf',
    scale: [1, 1, 1],
    rotation: 0,
    geometry: [1, 1, 3],
    material: { color: 'brown', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 3)) }
  },
  {
    name: 'coin',
    modelPath: 'Models/Coin/Coin.gltf',
    scale: [1, 1, 1],
    rotation: Math.PI / 2,
    geometry: [1, 0.3, 1],
    material: { color: 'yellow', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 0.3, 1)) }
  },
  {
    name: 'scenario',
    modelPath: 'Models/Scenario/scenario.gltf',
    scale: [1, 1, 1],
    rotation: -Math.PI / 2,
    geometry: [100, 0.01, 100],
    material: { color: 'green', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1000, 0.01, 1000)) }
  }
]
// Función para crear un objeto 3D con un RigidBody y un modelo GLTF
function createModel(name, modelPath, scale, rotation, geometry, material, physics, position, shouldMoveForward ) {
    let dt = dream.dt;
    let object3D = null;
    let objectCube = dream.createObject(name);
    dream.scene.add(objectCube);

    gltfLoader.load(
        modelPath,
        (gltf) => {
            console.log(`success loading ${name}`);
            gltf.scene.scale.set(...scale);
            gltf.scene.rotation.y = rotation;
            object3D = gltf.scene;
            dream.scene.add(object3D);
        }
    );
    dream.addComponentToObject(
        objectCube,
        'mesh',
        dream.Mesh.CreateFromGeometry(
            new THREE.BoxGeometry(...geometry),
            new THREE.MeshBasicMaterial(material)
        )
    );
    dream.addComponentToObject(
        objectCube,
        'rigidbody',
        dream.Physics.CreateBody(physics)
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
// Spawner function
function spawner(createModelFunc, modelParamsArray, spawnInterval, spawnPosition, maxCount) {
    let count = 0;

    let intervalId = setInterval(() => {
        if (count >= maxCount) {
            clearInterval(intervalId); // Stop spawning when maxCount is reached
            return;
        }

        // Select a random model from the first 5 models in the modelParamsArray
        let modelParams = modelParamsArray[Math.floor(Math.random() * 5)];

        let vehicle = createModelFunc(
            modelParams.name,
            modelParams.modelPath,
            modelParams.scale,
            modelParams.rotation,
            modelParams.geometry,
            modelParams.material,
            modelParams.physics,
            spawnPosition,
            true
        );
        vehicle.push(vehicles)

        count++;
    }, spawnInterval);
}

// ----------------------------------------------------------------->> WIZARD

// Dimensiones del RigidBody deL Wizard
let WizBox = new CANNON.Vec3(1, 1, 1);

// Crear objeto Wiz para registar el Rigidbody del Wizard
let Wiz = dream.createObject('Wiz');
dream.addComponentToObject(
    Wiz,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 3.5, 1),
        new THREE.MeshBasicMaterial({ color: 'green', wireframe: true, transparent: true, opacity: 0.9})
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

// ----------------------------------------------------------------->>                

/* SEGUNDO INTENTO DE SPAWNEAR VEHICULOS FALLIDO
// Posiciones spawners de los vehiculos
const spawnerPositions = [
  [-10, 0.2, -5],
  [-25, 1.5, -3],
  [-10, 0.8, 20],
  // ... other positions
]
// Obtener parametros de vehiculo por nombre
function getVehicleParamsByName(name) {
  return vehicleParams.find(params => params.name === name)
}
// Matriz de vehiculos
const vehicleMatrix = [
  { params: getVehicleParamsByName('ambulance'), spawnerIndex: 0 },
  { params: getVehicleParamsByName('policeCar'), spawnerIndex: 1 },
  { params: getVehicleParamsByName('fireTruck'), spawnerIndex: 2 },
  { params: getVehicleParamsByName('Taxi'), spawnerIndex: 3 },
  { params: getVehicleParamsByName('hatchBack'), spawnerIndex: 4 },
]
// Vehiculos con info completa para ser usados
const ambulance = vehicleMatrix[0]
const policeCar = vehicleMatrix[1]
const fireTruck = vehicleMatrix[2]
const Taxi = vehicleMatrix[3]
const hatchBack = vehicleMatrix[4]
// Función para spawnear un vehiculo
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
  dream.scene.add(vehicle)
}
*/

// ----------------------------------------------------------------->> Escenario y vehiculos a spwanear

let scenario = createModel(
    Modelos[10].name,
    Modelos[10].modelPath,
    Modelos[10].scale,
    Modelos[10].rotation,
    Modelos[10].geometry,
    Modelos[10].material,
    Modelos[10].physics,
    [0, 0, 0], // Initial position
);
let policeCar = createModel(
    Modelos[1].name,
    Modelos[1].modelPath,
    Modelos[1].scale,
    Modelos[1].rotation,
    Modelos[1].geometry,
    Modelos[1].material,
    Modelos[1].physics,
    [-80, 1, -7], // Initial position
    true
);
let ambulance = createModel(
    Modelos[0].name,
    Modelos[0].modelPath,
    Modelos[0].scale,
    Modelos[0].rotation,
    Modelos[0].geometry,
    Modelos[0].material,
    Modelos[0].physics,
    [-90, 1, -7],
    true
 );
let taxi = createModel(
    Modelos[3].name,
    Modelos[3].modelPath,
    Modelos[3].scale,
    Modelos[3].rotation,
    Modelos[3].geometry,
    Modelos[3].material,
    Modelos[3].physics,
    [-100, 1, -7],
    true
);
let hatchBack = createModel(
    Modelos[4].name,
    Modelos[4].modelPath,
    Modelos[4].scale,
    Modelos[4].rotation,
    Modelos[4].geometry,
    Modelos[4].material,
    Modelos[4].physics,
    [-80, 1, -15],
    true
);
let fireTruck = createModel(
    Modelos[2].name,
    Modelos[2].modelPath,
    Modelos[2].scale,
    Modelos[2].rotation,
    Modelos[2].geometry,
    Modelos[2].material,
    Modelos[2].physics,
    [-90, 1, -15],
    true
);
let trashTruck = createModel(
    Modelos[2].name,
    Modelos[2].modelPath,
    Modelos[2].scale,
    Modelos[2].rotation,
    Modelos[2].geometry,
    Modelos[2].material,
    Modelos[2].physics,
    [-100, 1, -15],
    true
);
let policeCar2 = createModel(
    Modelos[1].name,
    Modelos[1].modelPath,
    Modelos[1].scale,
    Modelos[1].rotation,
    Modelos[1].geometry,
    Modelos[1].material,
    Modelos[1].physics,
    [-80, 1, -45], // Initial position
    true
);
let ambulance2 = createModel(
    Modelos[0].name,
    Modelos[0].modelPath,
    Modelos[0].scale,
    Modelos[0].rotation,
    Modelos[0].geometry,
    Modelos[0].material,
    Modelos[0].physics,
    [-90, 1, -45],
    true
 );
let taxi2 = createModel(
    Modelos[3].name,
    Modelos[3].modelPath,
    Modelos[3].scale,
    Modelos[3].rotation,
    Modelos[3].geometry,
    Modelos[3].material,
    Modelos[3].physics,
    [-100, 1, -45],
    true
);
let hatchBack2 = createModel(
    Modelos[4].name,
    Modelos[4].modelPath,
    Modelos[4].scale,
    Modelos[4].rotation,
    Modelos[4].geometry,
    Modelos[4].material,
    Modelos[4].physics,
    [-80, 1, -77],
    true
);
let fireTruck2 = createModel(
    Modelos[2].name,
    Modelos[2].modelPath,
    Modelos[2].scale,
    Modelos[2].rotation,
    Modelos[2].geometry,
    Modelos[2].material,
    Modelos[2].physics,
    [-90, 1, -77],
    true
);
let trashTruck2 = createModel(
    Modelos[2].name,
    Modelos[2].modelPath,
    Modelos[2].scale,
    Modelos[2].rotation,
    Modelos[2].geometry,
    Modelos[2].material,
    Modelos[2].physics,
    [-100, 1, -77],
    true
);
let policeCar3 = createModel(
    Modelos[1].name,
    Modelos[1].modelPath,
    Modelos[1].scale,
    Modelos[1].rotation,
    Modelos[1].geometry,
    Modelos[1].material,
    Modelos[1].physics,
    [-80, 1, -84], // Initial position
    true
);
let ambulance3 = createModel(
    Modelos[0].name,
    Modelos[0].modelPath,
    Modelos[0].scale,
    Modelos[0].rotation,
    Modelos[0].geometry,
    Modelos[0].material,
    Modelos[0].physics,
    [-90, 1, -84],
    true
 );
let taxi3 = createModel(
    Modelos[3].name,
    Modelos[3].modelPath,
    Modelos[3].scale,
    Modelos[3].rotation,
    Modelos[3].geometry,
    Modelos[3].material,
    Modelos[3].physics,
    [-100, 1, -84],
    true
);
vehicles.push(policeCar3)
vehicles.push(ambulance3)
vehicles.push(taxi3)
vehicles.push(hatchBack2)
vehicles.push(fireTruck2)
vehicles.push(trashTruck2)
vehicles.push(policeCar2)
vehicles.push(ambulance2)
vehicles.push(taxi2)
vehicles.push(trashTruck)
vehicles.push(hatchBack)
vehicles.push(fireTruck)
vehicles.push(ambulance)
vehicles.push(taxi)
vehicles.push(policeCar)
let train = createModel(
    Modelos[7].name,
    Modelos[7].modelPath,
    Modelos[7].scale,
    Modelos[7].rotation,
    Modelos[7].geometry,
    Modelos[7].material,
    Modelos[7].physics,
    [128, 1, -27],
    true // Initial position
);
let train2 = createModel(
    Modelos[7].name,
    Modelos[7].modelPath,
    Modelos[7].scale,
    Modelos[7].rotation,
    Modelos[7].geometry,
    Modelos[7].material,
    Modelos[7].physics,
    [176, 1, -27],
    true // Initial position    
);
let train3 = createModel(
    Modelos[7].name,
    Modelos[7].modelPath,
    Modelos[7].scale,
    Modelos[7].rotation,
    Modelos[7].geometry,
    Modelos[7].material,
    Modelos[7].physics,
    [128, 1, -63],
    true // Initial position
);
let train4 = createModel(
    Modelos[7].name,
    Modelos[7].modelPath,
    Modelos[7].scale,
    Modelos[7].rotation,
    Modelos[7].geometry,
    Modelos[7].material,
    Modelos[7].physics,
    [176, 1, -63],
    true // Initial position    
);

// ----------------------------------------------------------------->> Fisicas y colisiones

vehicles.forEach(vehicle => {
    vehicle.rigidbody.addEventListener('collide', (e) => {
        console.log('GameOver! Pls hit f5 to restart', e.body);
        
    });
});

//------------------------------------------------>> extras

console.log(dream.objects)
console.log(dream.camera.instance.position)
console.log(vehicles)

dream.update = (dt) => {

// ------------------------------------------------------------------------------------------>> Animaciones a actualizar cada loop
    let WizMovAd = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            z: "-=3",
            ease: "back.inOut(1.7)",
            paused: true
        },     
    );
    let CamMovAd = gsap.to(dream.camera.instance.position,
        {duration: 0.25,
            z: "-=3",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let WizMovAtras = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            z: "+=3",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let CamMovAtras = gsap.to(dream.camera.instance.position,
        {duration: 0.25,
            z: "+=3",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let WizMovDer = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            x: "+=3.0",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let CamMovDer = gsap.to(dream.camera.instance.position,
        {duration: 0.25,
            x: "+=3.0",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let WizMovIzq = gsap.to(Wiz.rigidbody.position,
        {duration: 0.25,
            x: "-=3.0",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );
    let CamMovIzq = gsap.to(dream.camera.instance.position,
        {duration: 0.25,
            x: "-=3.0",
            ease: "back.inOut(1.7)",
            paused: true
        }
    );

// ------------------------------------------------------------------------------------------>> Inputs

    if (dream.input.isKeyPressed('KeyW') || dream.input.isKeyPressed('ArrowUp')) {
        WizMovAd.invalidate();
        CamMovAd.invalidate();
        WizMovAd.restart();
        CamMovAd.restart();
        
    }
    if (dream.input.isKeyPressed('KeyS') || dream.input.isKeyPressed('ArrowDown')) {
        WizMovAtras.invalidate();
        CamMovAtras.invalidate();
        WizMovAtras.restart();
        CamMovAtras.restart();
    }
    if (dream.input.isKeyPressed('KeyD') || dream.input.isKeyPressed('ArrowRight')) {
        WizMovDer.invalidate();
        CamMovDer.invalidate();
        WizMovDer.restart();
        CamMovDer.restart();
    }
    if (dream.input.isKeyPressed('KeyA') || dream.input.isKeyPressed('ArrowLeft')) {
        WizMovIzq.invalidate();
        CamMovIzq.invalidate();
        WizMovIzq.restart();
        CamMovIzq.restart();
    }

// ----------------------------------------------------------------------------------------->> Actualizar posición de Wizard

    Wizard.position.copy(Wiz.rigidbody.position)
    Wizard.position.y -= 1;
    Wizard.quaternion.copy(Wiz.rigidbody.quaternion)
    Wizard.rotation.y = Math.PI

// ---------------------------------------------------------->> Spawnear vehiculos y ponerlos en movimiento


setTimeout(() => {
    train.rigidbody.position.x -= dt * TrainSpeed;
}, 7000)
setTimeout(() => {
    train2.rigidbody.position.x -= dt * TrainSpeed;
}, 10000)
setTimeout(() => {
    train3.rigidbody.position.x -= dt * TrainSpeed;
}, 17000)
setTimeout(() => {
    train4.rigidbody.position.x -= dt * TrainSpeed;
}, 20000)
setTimeout(() => {
    policeCar.rigidbody.position.x += dt * vehicleSpeed;
}, 5000)
setTimeout(() => {
    ambulance.rigidbody.position.x += dt * vehicleSpeed;
}, 7000)
setTimeout(() => {
    ambulance.rigidbody.position.x += dt * vehicleSpeed;
}, 8000)
setTimeout(() => {
    taxi.rigidbody.position.x += dt * vehicleSpeed;
}, 10000)
setTimeout(() => {
    hatchBack.rigidbody.position.x += dt * vehicleSpeed;
}, 3000)
setTimeout(() => {
    fireTruck.rigidbody.position.x += dt * vehicleSpeed;
}, 7000)
setTimeout(() => {
    trashTruck.rigidbody.position.x += dt * vehicleSpeed;
}, 9000)
setTimeout(() => {
    policeCar2.rigidbody.position.x += dt * vehicleSpeed;
}, 5000)
setTimeout(() => {
    ambulance2.rigidbody.position.x += dt * vehicleSpeed;
}, 8000)
setTimeout(() => {
    ambulance2.rigidbody.position.x += dt * vehicleSpeed;
}, 11000)
setTimeout(() => {
    taxi2.rigidbody.position.x += dt * vehicleSpeed;
}, 9000)
setTimeout(() => {
    policeCar3.rigidbody.position.x += dt * vehicleSpeed;
}, 14000)
setTimeout(() => {
    ambulance3.rigidbody.position.x += dt * vehicleSpeed;
}, 10000)
setTimeout(() => {
    ambulance3.rigidbody.position.x += dt * vehicleSpeed;
}, 12000)
setTimeout(() => {
    taxi3.rigidbody.position.x += dt * vehicleSpeed;
}, 11000)
setTimeout(() => {
    hatchBack2.rigidbody.position.x += dt * vehicleSpeed;
}, 12000)
setTimeout(() => {
    fireTruck2.rigidbody.position.x += dt * vehicleSpeed;
}, 13000)
setTimeout(() => {
    trashTruck2.rigidbody.position.x += dt * vehicleSpeed;
}, 14000)


}
dream.start()