import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(0, 2, 10);

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({ color: 'green', wireframe: true})
)
planeMesh.rotateX(-Math.PI / 2)

const dodecahedronMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.DodecahedronGeometry(1 , 1),
    new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: true})
)
dodecahedronMesh.position.y = 1

dream_Engine.update = (dt) => {
    dodecahedronMesh.rotateY(dt)
    axesHelper.rotateY(dt)

    
}

dream_Engine.start()