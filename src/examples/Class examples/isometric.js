import Dream_Engine from "../../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()
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

const grid = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(70, 70, 10 , 10, 10, 10),
    new THREE.MeshBasicMaterial({ color: 'green', wireframe: true})
)

const grid1 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(100, 50 , 10, 10, 10, 10),
    new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false})
)

const grid2 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(100, 50 , 10, 10, 10, 10),
    new THREE.MeshBasicMaterial({ color: 'khaki', wireframe: false})
)

const grid3 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(50, 100 , 10, 10, 10, 10 ),
    new THREE.MeshBasicMaterial({ color: 'lightcoral', wireframe: false})
)

const grid4 = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(50, 100 , 10, 10, 10, 10 ),
    new THREE.MeshBasicMaterial({ color: 'purple', wireframe: false})
)   

let grid4PI_y = 2 

grid4.rotation.order = 'YXZ'
grid4.rotation.x = Math.PI /2
grid4.rotation.y = Math.PI /2

grid3.rotation.order = 'YXZ'
grid3.rotation.x = Math.PI /2
grid3.rotation.y = Math.PI /2

grid2.rotation.order = 'YXZ'
grid2.rotation.x = Math.PI /2
grid2.rotation.y = Math.PI /2

grid1.rotation.order = 'YXZ'
grid1.rotation.x = Math.PI /2
grid1.rotation.y = Math.PI /2

grid.rotation.order = 'YXZ'
grid.rotation.x = Math.PI / 2
grid.position.y = Math.PI / 2

boxMesh.rotation.order = 'YXZ'
boxMesh.rotation.x = Math.PI / 2
boxMesh.rotation.y = Math.PI / 2

dream_Engine.update = (dt) => {
    const totalElapsed = dream_Engine.totalElapsedInSeconds

    boxMesh.position.x = Math.cos(totalElapsed) * 10
    boxMesh.position.z = Math.sin(totalElapsed) * 10
    boxMesh.position.y = 0

    grid.position.y = -14.5
    grid.position.x = 0
    grid.position.z = 0

    grid1.position.y = -14.5
    grid1.position.x = 100
    grid1.position.z = 0
    
    grid2.position.x = -100
    grid2.position.y = -14.5
    grid2.position.z = 0  
    
    grid3.position.x = 0
    grid3.position.y = -14.5
    grid3.position.z = 100

    grid4.position.x = 0
    grid4.position.y = -14.5  
    grid4.position.z = -100 

    if (dream_Engine.input.isKeyPressed('KeyD')){
        dream_Engine.camera.instance.position.x -= 500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyA')){
        dream_Engine.camera.instance.position.x += 500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyW')){
        dream_Engine.camera.instance.position.z += 500 * dt
    }
    if (dream_Engine.input.isKeyPressed('KeyS')){
        dream_Engine.camera.instance.position.z -= 500 * dt
    }   

}

dream_Engine.start()