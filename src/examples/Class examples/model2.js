import * as THREE from 'three'
import Dream_Engine from '../../dream_Engine/Dream_Engine'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(4, 3, 5)

const gltfLoader = new GLTFLoader()
gltfLoader.load(
    '/Models/Fox/Fox.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        dream_Engine.scene.add(gltf.scene)
    }
)

const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.8)
const directionalLight = dream_Engine.Light.CreateDirectionalLight('yellow', 0.6)
directionalLight.position.set(5, 5, 5)

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: 'green',
        metalness: 0,
        roughness: 0.5
    })
)
planeMesh.rotateX(-Math.PI / 2)
dream_Engine.scene.add(planeMesh, ambientLight, directionalLight)
dream_Engine.camera.instance.lookAt(planeMesh.position)

dream_Engine.start()