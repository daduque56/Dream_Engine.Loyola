import * as THREE from 'three'
import Dream_Engine from '../dream_Engine/Dream_Engine.js'


const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(4, 3, 12)


const ambientLight = dream_Engine.Light.CreateAmbientLight( "white", 0.5)


const directionalLight = dream_Engine.Light.CreateDirectionalLight("yellow", 1)
directionalLight.position.set(5, 1, 0)


directionalLight.castShadow = true








const planeMesh = dream_Engine.Mesh.CreateFromGeometry(


    new THREE.PlaneGeometry(10,10),
    new THREE.MeshStandardMaterial({color: 'white', wireframe: false})


)


planeMesh.rotateX(-Math.PI/2)
planeMesh.position.x = 4


planeMesh.receiveShadow = true
       
       


const cubeMesh = dream_Engine.Mesh.CreateFromGeometry(


    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial( {color: 'orange', wireframe: false })


)
cubeMesh.position.set(5, 1, 0)


cubeMesh.castShadow = true




const capsuleMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.CapsuleGeometry(1, 2, 2),
    new THREE.MeshStandardMaterial({ color: 'grey', wireframe: false})
)
capsuleMesh.position.x = 5
capsuleMesh.position.y = 3
capsuleMesh.position.z = 1


capsuleMesh.castShadow = false


dream_Engine.update = (dt) => {
   


    cubeMesh.rotateX(dt)
    cubeMesh.rotateY(dt)


    capsuleMesh.rotateX(dt)
    capsuleMesh.rotateY(dt)




}


dream_Engine.start()
