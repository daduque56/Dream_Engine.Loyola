import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'  

const dream_Engine = new Dream_Engine()

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

dream_Engine.camera.instance.position.set(200, 200, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.lookAt(0, -40, 0);
dream_Engine.camera.instance.zoom = 1
dream_Engine.camera.instance.updateProjectionMatrix()

const boxMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: false})
)
boxMesh.add(axesHelper)

const grid = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(100, 20, 100),
    new THREE.MeshBasicMaterial({ color: 'gray', wireframe: false})
)

grid.position.y = -20


dream_Engine.update = (dt) => {
    boxMesh.rotateY(dt)
    axesHelper.rotateY(dt)
}

dream_Engine.start()

