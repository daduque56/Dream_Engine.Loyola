import * as THREE from 'three';
import Dream_Engine from '../../dream_Engine/Dream_Engine';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

const dream = new Dream_Engine();
dream.Physics.world.gravity.set(0, -9.81, 0)

const ambientLight = dream.Light.CreateAmbientLight();
dream.scene.add(ambientLight);
const directionalLight = dream.Light.CreateDirectionalLight('white', 1);
directionalLight.position.set(0, 10, 0);

dream.camera.instance.position.set(200,203, 200);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream.camera.instance.zoom = 10;
dream.camera.instance.updateProjectionMatrix()

const worldCenter = dream.Mesh.CreateAxesHelper();
  

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

// MATERIAL PIEDRA
const RcolorTexture = textureLoader.load('/Textures/Rock/Rock053_4K-JPG_Color.jpg');
const RnormalTetxure = textureLoader.load('/Textures/Rock/Rock053_4K-JPG_NormalGL.jpg');
const RambientOcclusionTexture = textureLoader.load('/Textures/Rock/Rock053_4K-JPG_AmbientOcclusion.jpg');
const RdisplacementTexture = textureLoader.load('/Textures/Rock/Rock053_4K-JPG_Displacement.jpg');
const RroughnessTexture = textureLoader.load('/Textures/Rock/Rock053_4K-JPG_Roughness.jpg');

const rockMaterial = new THREE.MeshStandardMaterial({
    map: RcolorTexture,
            normalMap: RnormalTetxure,
            aoMap: RambientOcclusionTexture,
            displacementMap: RdisplacementTexture,
            roughnessMap: RroughnessTexture,
            displacementScale: 1,
            roughness: 1,
            metalness: 0.5,
});

// MATERIAL PASTO
const PcolorTexture = textureLoader.load('/Textures/Grass002/Grass002_4K-JPG_Color.jpg');
const PambientOcclusionTexture = textureLoader.load('/Textures/Grass002/Grass002_4K-JPG_AmbientOcclusion.jpg');
const PdispacementTexture = textureLoader.load('/Textures/Grass002/Grass002_4K-JPG_Displacement.jpg');
const PnormalTexture = textureLoader.load('/Textures/Grass002/Grass002_4K-JPG_NormalGL.jpg');
const ProughnessTexture = textureLoader.load('/Textures/Grass002/Grass002_4K-JPG_Roughness.jpg');

const pastoMaterial = new THREE.MeshStandardMaterial({
    map: PcolorTexture,

});

// ----------------------------------------------------
// OBJETOS
const cubo1 = dream.createObject('cubo');
dream.addComponentToObject(
    cubo1,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 100, 100),
        rockMaterial
    )
)
cubo1.position.set(0, 3, 3);

const lava = dream.createObject('lava');
dream.addComponentToObject(
    lava,
    'mesh',
    dream.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(10, 10, 1 ),
        new THREE.MeshStandardMaterial({ color: 'green' })
    )
)
dream.addComponentToObject(
    lava,
    'rigidBody',
    dream.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Plane(),
        position: new CANNON.Vec3(0, 0, 0)
    }
    )
)
lava.rotateX(-Math.PI / 2);
lava.position.set(0, -1, 0);

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
 steve.position.set(0, 0, 0);
 dream.addComponentToObject(
    steve,
    'rigidBody',
    dream.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        position: new CANNON.Vec3(0, 0, 0)
    })
)

console.log(dream.getObjects());

dream.update = (dt) => {

    steve.position.z = -3;
    steve.position.y = -0.5;

}

dream.start();