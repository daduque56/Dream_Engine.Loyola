import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Dream_Engine from '../../dream_Engine/Dream_Engine';

const dream = new Dream_Engine();

const worldCenter = dream.Mesh.CreateAxesHelper();
worldCenter.name = "worldCenter";
worldCenter.position.set(0, 0, 0);  

dream.camera.instance.position.set(200,203, 200);
dream.camera.instance.rotation.order = 'YXZ';
dream.camera.instance.rotation.y = Math.PI / 4;
dream.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream.camera.instance.zoom = 15
dream.camera.instance.updateProjectionMatrix()

const ambientLight = dream.Light.CreateAmbientLight();
dream.scene.add(ambientLight);

const gltfLoader = new GLTFLoader()
gltfLoader.load(
    '/Models/steve/scene.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(3, 3, 3)
        dream.scene.add(gltf.scene)
    }
)

const suelo = dream.createObject();
suelo.name = "suelo";



dream.update = (dt) => {
    dream.getObjects();
}

// Review message of the git repo status

dream.start();
