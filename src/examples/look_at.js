import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()

dream_Engine.camera.instance.position.set(2, 2, 10);

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

const boxMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: false})
)

boxMesh.position.set(2, 4, -2)

dream_Engine.camera.instance.lookAt(boxMesh.position)

dream_Engine.start()