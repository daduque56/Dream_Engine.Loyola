import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es'
import Dream_Engine from '../../dream_Engine/Dream_Engine';
import gsap from 'gsap'

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

const Light = dream.Light.CreateDirectionalLight('white', 6);
Light.position.set(0, 10, 0);   
const lightHelper = dream.Light.CreateDirectionalLightHelper(Light);
//------------------------------------------------------------------------------>> TEXTURAS
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load('/Textures/Lava_005_SD/Lava_005_COLOR.jpg');
const heightTexture = textureLoader.load('/Textures/Lava_005_SD/Lava_005_DISP.png');
const maskTexture = textureLoader.load('/Textures/Lava_005_SD/Lava_005_MASK.jpg');
const normalTexture = textureLoader.load('/Textures/Lava_005_SD/Lava_005_NORM.jpg');
const roughnessTexture = textureLoader.load('/Textures/Lava_005_SD/Lava_005_ROUGH.jpg');
const ambientOcclusionTexture = textureLoader.load('/Textures/Lava_005_SD/Lava_005_OCC.jpg');

const lavaMaterial = new THREE.MeshStandardMaterial();
//lavaMaterial.map = colorTexture;
//lavaMaterial.displacementMap = heightTexture;
//lavaMaterial.displacementScale = 0.05;
//lavaMaterial.alphaMap = maskTexture;
//lavaMaterial.normalMap = normalTexture;
//lavaMaterial.normalScale.set(0.5, 0.5);
//lavaMaterial.roughnessMap = roughnessTexture;
//lavaMaterial.roughness = 0.5;
//lavaMaterial.aoMap = ambientOcclusionTexture;
//lavaMaterial.aoMapIntensity = 1;
//lavaMaterial.side = THREE.DoubleSide;
//lavaMaterial.transparent = true;

const lavaMaterial2 = new THREE.TextureLoader().load('/Textures/8bit.jpg');


const suelo = dream.createObject('suelo')
dream.addComponentToObject(
    suelo,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(10, 10, 10, 10),
        new THREE.MeshStandardMaterial({map: lavaMaterial2})
    )
)

//suelo.setAttribute('uv2', new THREE.BufferAttribute(suelo.attributes.uv.array, 2))


suelo.rotation.x = -Math.PI / 2

const bachGroundTexture = textureLoader.load('/static/8bit.jpg');
dream.scene.background = bachGroundTexture;

const cubo = dream.createObject('cubo')
dream.addComponentToObject(
    cubo,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({color: 'gray'})
    )
)

//------------------------------------------------------------------------------>> STEVE

let steve = dream.createObject('steve')

const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/Models/steve/scene.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(3, 3, 3)
        steve.add(gltf.scene)
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




let isJumping = false;

let animAdelante = gsap.to(steve.gltf.position,
     {duration: 0.5,
         x: 0,
         y: 0,
         z: "-=1",
         ease: "back.inOut(1.7)",
         paused: true
        }
);

let animAtras = gsap.to(steve.gltf.position,
    {duration: 0.5,
        x: 0,
        y: 0,
        z: "+=1",
        ease: "back.inOut(1.7)",
        paused: true
    }
);  


dream.update = (dt) => {
    dream.getObjects()


    //steve.rotation.y += dt * 0.5;
    if (dream.input.isKeyPressed('KeyW') || dream.input.isKeyPressed('ArrowUp')) {
        //steve.position.z -= 0.1
        //cubo.mesh.position.z -= 0.1
        animAdelante.invalidate();
        animAdelante.restart();
    }
    if (dream.input.isKeyPressed('KeyS')|| dream.input.isKeyPressed('ArrowDown')) {
        //steve.position.z += 0.1
        animAtras.invalidate();
        animAtras.restart();
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
