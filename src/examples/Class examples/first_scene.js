import * as THREE from 'three';

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene()

// Triángulo vertices 
const triangleVertices = new Float32Array([
    -100.0, -100.0, 100.0,
    100.0, -100.0, 100.0,
    100.0, 100.0, 100.0
]);


// Geometría
const geometry = new THREE.BufferGeometry()
const positionAttribute = new THREE.BufferAttribute(triangleVertices, 3)
geometry.setAttribute('position', positionAttribute)

// El material es el color del objeto
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000})

// El mesh es el objeto en sí   
const triangle = new THREE.Mesh(geometry, material)
scene.add(triangle)

// Camera
const camera = new THREE.OrthographicCamera(
    -sizes.width,
    sizes.width,
    sizes.height,
    -sizes.height,
);

camera.position.z = 125 
scene.add(camera)

// Renderer 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
