import * as THREE from 'three';
import Dream_Engine from '../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine();
dream_Engine.camera.instance.position.set(200, 200, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.zoom = 20
dream_Engine.camera.instance.updateProjectionMatrix()

const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.5)

const directionalLight = dream_Engine.Light.CreateDirectionalLight('white', 1)
directionalLight.position.set(5, 5, 1)
directionalLight.castShadow = true

const pointLight = dream_Engine.Light.CreatePointLight('purple', 50)  
pointLight.position.set(0, 2, 0)
pointLight.castShadow = true

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({color: 'black'})
)
planeMesh.rotateX(-Math.PI/2)
planeMesh.receiveShadow = true

const cubo = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({color: 'white'})
)
cubo.position.set(0, 1, 0)
cubo.castShadow = true

dream_Engine.scene.add(planeMesh, cubo, ambientLight, directionalLight, pointLight)
dream_Engine.camera.instance.lookAt(cubo.position);

dream_Engine.update = (dt) => {
    cubo.rotateX(dt)
    cubo.rotateY(dt)
}

dream_Engine.start();

