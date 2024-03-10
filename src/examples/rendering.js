import * as  THREE from 'three';
import Dream_Engine from '../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine()

const triangleVertices = new Float32Array([
    -100.0, -100.0, 100.0,
    100.0, -100.0, 100.0,
    100.0, 100.0, 100.0
]);

const geometry  = new THREE.BufferGeometry()
const positionAttribute = new THREE.BufferAttribute (triangleVertices,3)
geometry.setAttribute('positions', positionAttribute)

const material = new THREE.MeshBasicMaterial()
const triangle  = new THREE.Mesh(geometry,material)
dream_Engine.scene.add(triangle);

dream_Engine.start()

dream_Engine.update = (dt) => {
    const time = Dream_Engine.totalElapsedInSeconds
    triangle.position.x = Math.sin(time) * 600
    triangle.position.y = Math.cos(time) * 600
}