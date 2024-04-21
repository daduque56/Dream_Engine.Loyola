import * as THREE from 'three'  
import Dream_Engine from '../dream_Engine/Dream_Engine.js'
import {GLTFLoader} from 'three/examples/jsm/Addons.js'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(4, 3, 5)


const gltfLoader = new GLTFLoader()
console.log(gltfLoader)
gltfLoader.load(
    'Dream_Engine.Loyola/static/Models/Fox/Fox.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(0.025, 0.025, 0.025)

        dream_Engine.scene.add(gltf.scene)
    },
    (progress) => {
        console.log('progress')
        console.log(progress)
    
    },
    (error) => {
        console.log('error')
        console.log(error)
    }
)


const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.5)
const directionalLight = dream_Engine.Light.CreateDirectionalLight('yellow', 1)
directionalLight.position.set(5, 5, 5)

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial(
        {color: 'green'})
)
planeMesh.rotateX(-Math.PI / 2)
dream_Engine.scene.add(planeMesh, ambientLight, directionalLight)
dream_Engine.camera.instance.lookAt(planeMesh.position)

dream_Engine.update = (dt) => {
}

dream_Engine.start()

