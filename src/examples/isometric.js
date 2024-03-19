import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(200, 200, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.zoom = 1
dream_Engine.camera.instance.updateProjectionMatrix()

const boxMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: false})
)

const grid = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(100, 100, 10, 10 ),
    new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
)

const grid1 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(100, 50 , 10, 10 ),
    new THREE.MeshBasicMaterial({ color: 'lightgray', wireframe: true })
)

grid1.rotation.order = 'YXZ'
grid1.rotation.x = Math.PI /2
grid1.rotation.y = Math.PI /2 

grid.rotation.order = 'YXZ'
grid.rotation.x = Math.PI / 2
grid.position.y = Math.PI / 2

dream_Engine.update = (dt) => {
    const totalElapsed = dream_Engine.totalElapsedInSeconds
    boxMesh.position.x = Math.cos(totalElapsed) * 10
    boxMesh.position.z = Math.sin(totalElapsed) * 10

    grid.position.y = -10
    grid1.position.y = -10
    grid1.position.x = -110
    boxMesh.position.y = 0
}

dream_Engine.start()