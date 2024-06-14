import * as THREE from 'three' 
import Dream_Engine from "../../dream_Engine/Dream_Engine";

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(0, 0, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.zoom = 7
dream_Engine.camera.instance.updateProjectionMatrix()

const ambientLight = dream_Engine.Light.CreateAmbientLight(
    'white', 
    0.5
)   
dream_Engine.scene.add(ambientLight)

const directionalLight = dream_Engine.Light.CreateDirectionalLight(
    'white', 
    0.5
)
directionalLight.position.set(0, 10, 0)
const directionalLightHelper = dream_Engine.Light.CreateDirectionalLightHelper(
    directionalLight
)
dream_Engine.scene.add(directionalLightHelper)

const pointLight = dream_Engine.Light.CreatePointLight(
    'blue', 
    10
)
const pointLightHelper = dream_Engine.Light.CreatePointLightHelper(
    pointLight,
    1
)
dream_Engine.scene.add(pointLightHelper)
pointLight.add(pointLightHelper)
pointLight.position.set(3.5, 0, 0)    

const pointLight2 = dream_Engine.Light.CreatePointLight(
    'purple', 
    10
)
dream_Engine.scene.add(pointLight2)
const pointLightHelper2 = dream_Engine.Light.CreatePointLightHelper(
    pointLight2,
    1
)   
dream_Engine.scene.add(pointLightHelper2)
pointLight2.add(pointLightHelper2)
pointLight2.position.set(0, 1, 1)

pointLight2.position.set(0, -3, 0)   

const pointLight3 = dream_Engine.Light.CreatePointLight(
    'red', 
    10
)
dream_Engine.scene.add(pointLight3)
const pointLightHelper3 = dream_Engine.Light.CreatePointLightHelper(
    pointLight3,
    1
)   
dream_Engine.scene.add(pointLightHelper3)
pointLight3.add(pointLightHelper3)
pointLight3.position.set(-3.5, 0, 0)

const cubeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({ color: 'gray', wireframe: false})
)
cubeMesh.position.set(0, 0, 0)  
dream_Engine.camera.instance.lookAt(cubeMesh.position);

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()
dream_Engine.scene.add(axesHelper)
axesHelper.position.set(0, 0, 0)

dream_Engine.update = function (dt) {
    cubeMesh.rotateX(dt)
    cubeMesh.rotateY(dt)
    //cubeMesh.rotateZ(dt)
}

dream_Engine.start()

