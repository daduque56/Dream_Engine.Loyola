import * as THREE from 'three'; 
import Dream_Engine from '../../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine();
dream_Engine.camera.instance.position.set(0, 0, 3);
dream_Engine.camera.instance.zoom = 5;

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('Puerta/Door_Wood_001_basecolor.jpg');
const aoTexture = textureLoader.load('Puerta/Door_Wood_001_ambientOcclusion.jpg');
const heightTexture = textureLoader.load('Puerta/Door_Wood_001_height.png');
const metalnessTexture = textureLoader.load('Puerta/Door_Wood_001_metallic.jpg');
const roughnessTexture = textureLoader.load('Puerta/Door_Wood_001_roughness.jpg');
const normalTexture = textureLoader.load('Puerta/Door_Wood_001_normal.jpg');
const alphaTexture = textureLoader.load('Puerta/Door_Wood_001_opacity.jpg');

// Luces 
//const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.5);
//const directionalLight = dream_Engine.Light.CreateDirectionalLight('white', 0.5);
//directionalLight.position.set(5, 3, 3);

//Mesh 
const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));

const material = new THREE.MeshStandardMaterial();

material.map = colorTexture;
material.aoMap = aoTexture;
material.aoMapIntensity = 1;
material.displacementMap = heightTexture;
material.displacementScale = 0.05;   
material.metalnessMap = metalnessTexture;
material.metalness = 0.5;
material.roughnessMap = roughnessTexture;
material.roughness = 0.5;
material.normalMap = normalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = alphaTexture;

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(geometry, material);
planeMesh.rotation.y = Math.PI / 4;
planeMesh.position.set(-0.5, 0, 0)

const planeMesh2 = dream_Engine.Mesh.CreateFromGeometry(geometry, material);
planeMesh2.rotation.y = -Math.PI / 4;
planeMesh2.position.set(0.5, 0, 0)

const cubo = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({color: 'gray'})
)
cubo.position.set(0, -0.1, 0)
cubo.rotation.set(0, 0, 0.8)
dream_Engine.scene.add(cubo);   

/*  const suelo = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshBasicMaterial({color: 'green'})
)   
suelo.rotation.x = -Math.PI / 2;
suelo.position.y = -1;*/

const pointLight = dream_Engine.Light.CreatePointLight('blue', 1);
pointLight.position.set(0, -0.5, 0.5);
const pointLightHelper = dream_Engine.Light.CreatePointLightHelper(pointLight, 0.5);
pointLight.add(pointLightHelper);

const pointLight2 = dream_Engine.Light.CreatePointLight('crimson', 0.5);
pointLight2.position.set(0, 0.4, 0.5);
const pointLightHelper2 = dream_Engine.Light.CreatePointLightHelper(pointLight2, 0.5);
pointLight2.add(pointLightHelper2);

dream_Engine.scene.add(planeMesh);  

dream_Engine.update = (dt) => {
   cubo.rotateY(dt)
   cubo.rotateX(dt)
    cubo.rotateZ(dt)    
}

dream_Engine.start();