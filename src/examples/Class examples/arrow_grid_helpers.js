import Dream_Engine from "../../dream_Engine/Dream_Engine";
import * as THREE from 'three'  

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(0, 2, 8);

const gridHelper = dream_Engine.Mesh.CreateGridHelper(10, 10)

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

const arrowHelper = dream_Engine.Mesh.CreateArrowHelper(
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(2, 0, 1),
    1,
    0xffff00
)

dream_Engine.update = (dt) => {
    arrowHelper.rotateY(dt)
    axesHelper.rotateY(dt)
    gridHelper.rotateY(dt)
    
}

dream_Engine.start()