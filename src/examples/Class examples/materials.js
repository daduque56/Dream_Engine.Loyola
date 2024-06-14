import * as THREE from 'three';
import Dream_Engine from "../../dream_Engine/Dream_Engine";

const dream_Engine = new Dream_Engine() 
dream_Engine.camera.instance.position.set(200, 0, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.zoom = 25
dream_Engine.camera.instance.updateProjectionMatrix()

const ambientLight = dream_Engine.Light.CreateAmbientLight('white', 0.5)   
ambientLight.position.set(0, 0, 0)  

const directionalLight = dream_Engine.Light.CreateDirectionalLight('white', 0.5)
const directionalLightHelper = dream_Engine.Light.CreateDirectionalLightHelper(directionalLight)
directionalLightHelper.position.copy(directionalLight.position)
directionalLight.position.set(4, 4, 0)

const cubo = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial({color: 'red'})
)
cubo.position.set(-6, 0, 0)


const esfera = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial(
        {color: 'crimson', flatShading: true}, 
        {metalness: 10, 
        roughness: 0.5,
        wireframe: false,
    })
)

const donut = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.TorusGeometry(1, 0.5, 16, 100),
    new THREE.MeshStandardMaterial({color: 'blue'})
)
donut.position.set(6, 0, 0)

dream_Engine.scene.add(ambientLight, directionalLight, cubo, esfera, donut)
dream_Engine.camera.instance.lookAt(esfera.position);

dream_Engine.update = (dt) => {
    cubo.rotateX(dt)
    cubo.rotateY(dt)
    cubo.rotateZ(dt)

    esfera.rotateY (dt)

    donut.rotateY(dt)
}

dream_Engine.start()