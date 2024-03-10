import * as THREE from 'three'

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene()

const triangleVertices = new Float32Array ([
    -100.0, -100.0, 100.0,
    100.0, -100.0, 100.0,
    100.0, 100.0, 100.0  
]);

const geometry = new THREE.BufferGeometry()
const positionAttribute = new THREE.BufferAttribute(triangleVertices, 3)
geometry.setAttribute('position',positionAttribute)

const material = new THREE.MeshBasicMaterial( { color: 0x6AB7D5 })

const triangle = new THREE.Mesh(geometry, material)
scene.add(triangle)

const camera = new THREE.OrthographicCamera(
    -sizes.width,
    sizes.width,
    sizes.height,
    -sizes.height

);
camera.position.z = 25
scene.add(camera)

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(sizes.width, sizes.width)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera)

