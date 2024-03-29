import Dream_Engine from "../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()

const boxMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(300, 300, 300, 10, 10, 10), 
    new THREE.MeshBasicMaterial({ color: 'cornflowerblue', wireframe: true })
    )
    boxMesh.position.x = 400
    boxMesh.position.y = 400
    boxMesh.position.z = -300
    boxMesh.rotation.z = 450
    boxMesh.rotation.x = 
    boxMesh.rotation.y = 100
    

    const capsuleMesh = dream_Engine.Mesh.CreateFromGeometry(
        new THREE.CapsuleGeometry(150, 300, 6, 10), 
        new THREE.MeshBasicMaterial({ color: 'khaki', wireframe: true })
    )
    capsuleMesh.position.x = -400
    capsuleMesh.position.y = -400
    capsuleMesh.position.z = -300

    const sphereMesh = dream_Engine.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(150, 32, 16), 
        new THREE.MeshBasicMaterial({ color: 'lightcoral', wireframe: true })    
    ) 
    sphereMesh.position.x = -400
    sphereMesh.position.y = 400 
    sphereMesh.position.z = -200

    const torusMesh = dream_Engine.Mesh.CreateFromGeometry(
        new THREE.TorusKnotGeometry(200, 60, 50, 30), 
        new THREE.MeshBasicMaterial({ color: 'lightgreen', wireframe: true })
    )
    torusMesh.position.x = 400      
    torusMesh.position.y = -400



    dream_Engine.update = (dt) => {
       /* boxMesh.rotateX(dt)
        capsuleMesh.rotateZ(dt)
        sphereMesh.rotateZ(dt)
        torusMesh.rotateY(dt)
        torusMesh.rotateX(dt)
        
        boxMesh.rotation.z += 100 * dt
        capsuleMesh.rotation.y += 100 * dt
        sphereMesh.rotation.y += 100 * dt
        torusMesh.rotation.z += 100 * dt
        */

       capsuleMesh.rotation.z += Math.cos(1) * (dt*2)
       capsuleMesh.rotation.y += Math.cos(100) * (dt*2)
       capsuleMesh.rotation.x += Math.cos(1) * (dt*2)

       sphereMesh.rotation.z += Math.cos(1) * (dt*2)
       sphereMesh.rotation.y += Math.cos(5) * (dt*2)
       sphereMesh.rotation.x += Math.cos(1) * (dt*2)

       //boxMesh.rotation.x += Math.cos(1) * (dt*2)
       //boxMesh.rotation.y += Math.cos(1) * (dt*2)
    }

    dream_Engine.start()