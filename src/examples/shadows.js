import * as THREE from 'three';
import Dream_Engine from '../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine();

const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.5)

const directionalLight = dream_Engine.Light.CreateDirectionalLight('white', 1)
directionalLight.position.set(5, 5, 1)
directionalLight.castShadow = true

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
)
planeMesh.rotateX =(-Math.PI / 2)
planeMesh.receiveShadow = true

const cubo = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({color: 'crimson'})
)
cubo.position.set(0, 1, 0)
cubo.castShadow = true

dream_Engine.scene.add(planeMesh, cubo, ambientLight, directionalLight)

dream_Engine.update = (dt) => {
    cubo.rotateX(dt)
    cubo.rotateY(dt)
}

dream_Engine.start();