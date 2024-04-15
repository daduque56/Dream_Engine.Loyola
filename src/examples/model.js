import * as THREE from 'three'  
import Dream_Engine from '../dream_Engine/Dream_Engine.js'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(4, 3, 5)

const gltfLoader = new GLTFLoader()
gltfLoader.load(
    'models/monkey/scene.gltf',
    (gltf) => {
        console.log(gltf)
        
        dream_Engine.scene.instance.add(gltf.scene)
    }
)