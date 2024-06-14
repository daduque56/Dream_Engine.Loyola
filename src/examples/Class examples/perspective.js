import Dream_Engine from "../../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()


dream_Engine.camera.instance.position.set(2, 2, 10);

const boxMesh =  dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: true})
) 

boxMesh.position.x = -1
boxMesh.position.y = -1

const torusMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.TorusKnotGeometry(2, 0.4, 64, 8),
    new THREE.MeshBasicMaterial({ color: 'palegreen', wireframe: true})
)

torusMesh.position.x = 1
torusMesh.position.y = 1
torusMesh.position.z = -15

const dodecahedronMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.DodecahedronGeometry(0.8),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: true})
)  

dodecahedronMesh.position.x = 4
dodecahedronMesh.position.y = -1
dodecahedronMesh.position.z = 0

const coneMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.ConeGeometry(1, 2, 32),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: true})
)

dream_Engine.update = (dt) => {
    boxMesh.rotateY(dt*2)
    torusMesh.rotateX(dt)
    dodecahedronMesh.rotateY(dt*2)
}

dream_Engine.start()