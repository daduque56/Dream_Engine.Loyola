import * as THREE from 'three';
import Dream_Engine from '../../dream_Engine/Dream_Engine';
import sources from '../../dream_Engine/sources-example';

const dream_Engine = new Dream_Engine();
dream_Engine.camera.instance.position.set(0 , 0, 4);
dream_Engine.Assets.loadAssets(sources)

const material = new THREE.MeshStandardMaterial();
const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
)
const doorMesh = dream_Engine.Mesh.CreateFromGeometry(geometry, material);
doorMesh.position.x = -1;

let helmetModel = null;

dream_Engine.Assets.onLoad = (e) => {
    
    // First we need to wait until the door textures are loaded
    material.map = dream_Engine.Assets.get('colorTexture');
    material.aoMap = dream_Engine.Assets.get('aoTexture');
    material.transparent = true;
    material.alphaMap = dream_Engine.Assets.get('alphaTexture');
    material.needsUpdate = true;

    // Then we cretae the helmet mesh model
    helmetModel = dream_Engine.Assets.get('helmetModel').scene;
    helmetModel.scale.set(2 ,2, 2);
    helmetModel.position.set(1, -0.5, 0);
    dream_Engine.scene.add(helmetModel);
}

const ambientLigth = dream_Engine.Light.CreateAmbientLight('white', 1);
const directionalLight = dream_Engine.Light.CreateDirectionalLight('white', 1);
directionalLight.position.set(5, 3, 3);

dream_Engine.update = (dt) => {
    if (helmetModel) {
        helmetModel.rotateY(dt);
    }
}

dream_Engine.start();