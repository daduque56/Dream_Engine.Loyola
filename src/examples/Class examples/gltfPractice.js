import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es'
import Dream_Engine from '../../dream_Engine/Dream_Engine';

const dream = new Dream_Engine();
dream.Physics.world.gravity.set(0, -9.81, 0)
const worldCenter = dream.Mesh.CreateAxesHelper();
worldCenter.name = "worldCenter";
worldCenter.position.set(0, 0, 0);  

//------------------------------------------------------------------------------>> CAMARA Y LUCES

dream.camera.instance.position.set(200,203, 200);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream.camera.instance.zoom = 15
dream.camera.instance.updateProjectionMatrix()

const ambientLight = dream.Light.CreateAmbientLight();
dream.scene.add(ambientLight);
//------------------------------------------------------------------------------>> TEXTURAS
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/Models/Puerta/Door_Wood_001_basecolor.jpg');



//------------------------------------------------------------------------------>> STEVE

let steve = dream.createObject('steve')

const gltfLoader = new GLTFLoader()
gltfLoader.load(
    '/Models/steve/scene.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(3, 3, 3)
        steve = gltf.scene
        dream.scene.add(gltf.scene)
    }
)

dream.addComponentToObject(
    steve,
    'rigidbody',
    dream.Physics.CreateBody({
        mass: 2,
        shape: new CANNON.Box(new CANNON.Vec3(0.45, 0.4, 0.45)),
    }) 
)

let suelo = dream.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x00ff00,}),
)

suelo.rotation.x = -Math.PI / 2

let isJumping = false;


dream.update = (dt) => {
    dream.getObjects()


    //steve.rotation.y += dt * 0.5;
    if (dream.input.isKeyPressed('KeyW') || dream.input.isKeyPressed('ArrowUp')) {
        steve.position.z -= 0.1
    }
    if (dream.input.isKeyPressed('KeyS')|| dream.input.isKeyPressed('ArrowDown')) {
        steve.position.z += 0.1
    } 
    if (dream.input.isKeyPressed('KeyA') || dream.input.isKeyPressed('ArrowLeft')) {
       steve.position.x -= 0.1
    }   
    if (dream.input.isKeyPressed('KeyD') || dream.input.isKeyPressed('ArrowRight')) {
       steve.position.x += 0.1
    }
    if (dream.input.isKeyPressed('Space')) {
          
    }
}

// Review message of the git repo status

dream.start();
