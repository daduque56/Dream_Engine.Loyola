import * as THREE from 'three';
import Dream_Engine from '../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine();

// Camara
dream_Engine.camera.instance.position.set(0, 0, 5);

// Logica texturas 
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => 
{
    console.log('loading started');
}

loadingManager.onLoad = () => {
    console.log('loading finished');
}

loadingManager.onProgress = () => {
    console.log('loading progressing');
}

loadingManager.onError = () => {
    console.log('loading error');
}
// Texturas, materiales y Mesh 
const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load('Puerta/Door_Wood_001_basecolor.jpg');
//const normalTexture = textureLoader.load('Dream_Engine.Loyola/src/static/Puerta/Door_Wood_001_normal.jpg');
//const metalnessTexture = textureLoader.load('Dream_Engine.Loyola/src/static/Puerta/Door_Wood_001_metallic.jpg');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({map: colorTexture});
const cubo = new THREE.Mesh(geometry, material);
dream_Engine.scene.add(cubo);

dream_Engine.camera.instance.lookAt(cubo.position);
const cuboHelper = dream_Engine.Mesh.CreateAxesHelper(cubo, 1);
cuboHelper.position.copy(cubo.position);


// Update 
dream_Engine.update = (dt) => {
    cuboHelper.rotation.copy(cubo.rotation);
    cubo.rotateX(dt)
    cubo.rotateY(dt)
    cubo.rotateZ(dt)
}

dream_Engine.start();