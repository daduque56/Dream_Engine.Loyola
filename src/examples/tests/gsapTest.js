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

dream.camera.instance.position.set(205,203, 180);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream.camera.instance.zoom = 10
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

const Modelos = [
  {
    name: 'ambulance',
    modelPath: 'Models/Ambulance/Ambulance.gltf',
    scale: [1.5, 1.2, 1.2],
    rotation: Math.PI / 2,
    geometry: [7, 1.5, 4],
    material: { color: 'purple', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 2)) }
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
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(4, 1, 2)) }
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
  },
  {
    name: 'wizard',
    modelPath: 'Models/Wizard/Wizard.gltf',
    scale: [1, 1.2, 1],
    rotation: Math.PI / 2,
    geometry: [1, 3.5, 1],
    material: { color: 'green', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 1, shape: new CANNON.Box(new CANNON.Vec3(1, 3.5, 1)) }
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
    rotation: 0,
    geometry: [1, 1, 3],
    material: { color: 'gray', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 3)) }
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
    modelPath: 'Models/Scenario/Scenario.gltf',
    scale: [1, 1, 1],
    rotation: Math.PI / 2,
    geometry: [100, 0.01, 100],
    material: { color: 'green', wireframe: true, transparent: true, opacity: 0.6 },
    physics: { mass: 0, shape: new CANNON.Box(new CANNON.Vec3(100, 0.01, 100)) }
  }
]
// Función para crear un objeto 3D con un RigidBody y un modelo GLTF
function createModel(name, modelPath, scale, rotation, geometry, material, physics, position, shouldMoveForward ) {
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

        if (shouldMoveForward) {
        objectCube.rigidbody.velocity.x = speed;
    }

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

        createModelFunc(
            modelParams.name,
            modelParams.modelPath,
            modelParams.scale,
            modelParams.rotation,
            modelParams.geometry,
            modelParams.material,
            modelParams.physics,
            spawnPosition
        );

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


// ----------------------------------------------------------------->> MODELOS 
                                   
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

// ----------------------------------------------------------------->> ROAD

let ambulance = createModel(
    Modelos[0].name,
    Modelos[0].modelPath,
    Modelos[0].scale,
    Modelos[0].rotation,
    Modelos[0].geometry,
    Modelos[0].material,
    Modelos[0].physics,
    [-10, 1.5, -3] // Initial position
);

let scenario = createModel(
    Modelos[10].name,
    Modelos[10].modelPath,
    Modelos[10].scale,
    Modelos[10].rotation,
    Modelos[10].geometry,
    Modelos[10].material,
    Modelos[10].physics,
    [0, 0, 0] // Initial position
);


console.log(dream.objects)
console.log(dream.camera.instance.position)

let speed = 1;

/*
let ambulance = createModel(
    Modelos[0].name,
    Modelos[0].modelPath,
    Modelos[0].scale,
    Modelos[0].rotation,
    Modelos[0].geometry,
    Modelos[0].material,
    Modelos[0].physics,
    [-25, 1.5, -3] // Initial position
);
let policeCar = createModel(
    Modelos[1].name,
    Modelos[1].modelPath,
    Modelos[1].scale,
    Modelos[1].rotation,
    Modelos[1].geometry,
    Modelos[1].material,
    Modelos[1].physics,
    [-15, 1.5, -3] // Initial position
);*/

dream.update = (dt) => {

// ---------------------------------------------------------->> Animaciones a actualizar cada loop
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
    //policeCars.rigidbody.position.x += dt * speed;
    // ---------------------------------------------------------->> Inputs

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


    Wizard.position.copy(Wiz.rigidbody.position)
    Wizard.position.y -= 1;
    Wizard.quaternion.copy(Wiz.rigidbody.quaternion)
    Wizard.rotation.y = Math.PI

    //ambulance.rigidbody.position.x += dt * speed;
    //policeCar.rigidbody.position.x += dt * speed;

// ----------------------------------------------------------SPAWNER
//spawner(createModel, Modelos, 4000, [-25, 1.5, -3], 3, true);

}

dream.start()