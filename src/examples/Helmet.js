import * as THREE from 'three'
import Dream_Engine from '../dream_Engine/Dream_Engine.js'
import sources from '../dream_Engine/sources-example.js'


const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(0, 0, 4)
dream_Engine.Assets.loadAssets(sources)

const material = new THREE.MeshStandardMaterial()
const geometry = new THREE.PlaneGeometry(1, 1, 100, 100)
geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2) 
)
const doorMesh = dream_Engine.Mesh.CreateFromGeometry(geometry, material)
doorMesh.position.x = -1

let helmetModel = null 

dream_Engine.onAssetsLoaded = (e) => {

    material.map = dream_Engine.assets.get('colorTexture')
    material.aoMap = dream_Engine.assets.get('aoTexture')
    material.transparent = true
    material.alphaMap = dream_Engine.assets.get('alphaTexture')
    material.needsUpdate = true

    helmetModel = dream_Engine.assets.get('helmetModel')
    helmetModel.scene.scale.set(0.5, 0.5, 0.5)
    helmetModel.scene.position.x = 1
    dream_Engine.scene.add(helmetModel.scene, doorMesh)
}

const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 1)
const directionalLight = dream_Engine.Light.CreateDirectionalLight('white', 1)
directionalLight.position.set(5, 3, 3)