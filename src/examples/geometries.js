import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()

const boxMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(300, 200, 80, 2, 2, 2), 
    new THREE.MeshBasicMaterial({ color: 'cornflowerblue' })
    )
    boxMesh.position.x = 400
    boxMesh.position.y = 400

    const capsuleMesh = dream_Engine.Mesh.CreateFromGeometry(
        new THREE.CapsuleGeometry(100, 200, 6, 8), 
        new THREE.MeshBasicMaterial({ color: 'khaki', wireframe: true })
    )
    capsuleMesh.position.x = -400
    capsuleMesh.position.y = -400

    const sphereMesh = dream_Engine.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(100, 32, 16), 
        new THREE.MeshBasicMaterial({ color: 'lightcoral', wireframe: true })    
    ) 
    sphereMesh.position.x = -400
    sphereMesh.position.y = 400 

    const torusMesh = dream_Engine.Mesh.CreateFromGeometry(
        new THREE.TorusKnotGeometry(200, 60, 50, 30), 
        new THREE.MeshBasicMaterial({ color: 'lightgreen', wireframe: true })
    )
    torusMesh.position.x = 400      
    torusMesh.position.y = -400



    dream_Engine.update = (dt) => {
        boxMesh.rotateX(dt)
        capsuleMesh.rotateZ(dt)
        sphereMesh.rotateZ(dt)
        torusMesh.rotateY(dt)
        torusMesh.rotateX(dt)
        /*
        boxMesh.rotation.z += 100 * dt
        capsuleMesh.rotation.y += 100 * dt
        sphereMesh.rotation.y += 100 * dt
        torusMesh.rotation.z += 100 * dt
        */
    }

    dream_Engine.start()