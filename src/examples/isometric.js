import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(100, 100, 100);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.zoom = 1
dream_Engine.camera.instance.updateProjectionMatrix()

const boxMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: true})
)

const grid = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(1000, 1000, 10, 10),
    new THREE.MeshBasicMaterial({ color: 'lightgray', wireframe: true })
)

grid.rotation.order = 'YXZ'
grid.rotation.x = Math.PI / 2
grid.position.y = Math.PI / 2

dream_Engine.update = (dt) => {
    const totalElapsed = dream_Engine.totalElapsedInSeconds
    boxMesh.position.x = Math.cos(totalElapsed) * 20
}

dream_Engine.start()