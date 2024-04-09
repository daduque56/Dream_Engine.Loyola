import * as THREE from 'three' 
import Dream_Engine from "../dream_Engine/Dream_Engine";

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(2, 3, 7);

const directionalLight = dream_Engine.Light.CreateDirectionalLight(
    white, 
    1.5
)
directionalLight.position.set(0, 10, 0)

const cubeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 'crimson', wireframe: false})
)


dream_Engine.update = function (dt) {
    cubeMesh.rotateX(dt)
    cubeMesh.rotateY(dt)
    cubeMesh.rotateZ(dt)
}

dream_Engine.start()

