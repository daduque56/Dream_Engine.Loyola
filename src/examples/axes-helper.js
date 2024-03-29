import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'  

const dream_Engine = new Dream_Engine()

dream_Engine.camera.instance.position.set(2, 4, 8);

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

const boxMesh =  dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'khaki', wireframe: false})
)   

dream_Engine.update = (dt) => {
    boxMesh.rotateY(dt)
    }

dream_Engine.start()