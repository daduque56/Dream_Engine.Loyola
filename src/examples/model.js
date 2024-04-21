import * as THREE from 'three'  
import Dream_Engine from '../dream_Engine/Dream_Engine.js'
import {GLTFLoader, Wireframe} from 'three/examples/jsm/Addons.js'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(4, 3, 5)



const gltfLoader = new GLTFLoader()
console.log(gltfLoader)
gltfLoader.load(
    '/Models/Avocado/Avocado.gltf',
    (gltf) => 
    {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(30, 30, 30)
        
        dream_Engine.scene.add(gltf.scene)
        
    },
    (progress) => 
    {
        console.log('progress')
        console.log(progress)
    
    },
    (error) => 
    {
        console.log('error')
        console.log(error)
    }
)


const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.5)
const directionalLight = dream_Engine.Light.CreateDirectionalLight('yellow', 1)
directionalLight.position.set(5, 5, 5)

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(2, 2, 10, 10),
    new THREE.MeshStandardMaterial(
        {color: 'crimson', wireframe: true, metalness: 0, roughness: 1000},
        
    )
)

planeMesh.position.set(0, 5, 0)
planeMesh.rotateX(-Math.PI / 2)
dream_Engine.scene.add(planeMesh, ambientLight, directionalLight)
dream_Engine.camera.instance.lookAt(0, 0.5, 0)

let elapsedTime = 0

dream_Engine.update = (dt) => {
    elapsedTime += dt
    planeMesh.position.y = Math.cos(-Math.sin(elapsedTime))
}

dream_Engine.start()

