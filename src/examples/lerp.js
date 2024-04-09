import * as THREE from 'three'
import Dream_Engine from './Dream_Engine'

const dream_Engine = new Dream_Engine() 
dream_Engine.camera.instance.position.set(3, 7, 18)

const gridHelper = dream_Engine.Mesh.CreateGridHelper(20,20, 'red', 'blue')

const startPosition =  new THREE.Vector3(-10, 0, 0)
const endPosition = new THREE.Vector3(10, 0, 0)
const startColor = new THREE.Color('red')
const endColor = new THREE.Color('blue')

const cube = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: false})
)   

dream_Engine.update = (dt) => {
    const elpasedTime = dream_Engine.totalElapsedInSseconds
    const timerSpeed = 2
    const alpha = (elpasedTime / timerSpeed) % 1

    console.log(alpha)

    cube.position.copy(startPosition).lerp(endPosition, alpha)
    cube.material.color.copy(startColor).lerp(endColor, alpha)
}

dream_Engine.start()