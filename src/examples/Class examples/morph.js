import * as THREE from 'three';
import Dream_Engine from '../../dream_Engine/Dream_Engine';

const dream_Engine = new Dream_Engine();
dream_Engine.camera.instance.position.set(200,200, 200);
dream_Engine.camera.instance.rotation.order = 'YXZ';
dream_Engine.camera.instance.rotation.y = Math.PI / 4;
dream_Engine.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
dream_Engine.camera.instance.zoom = 100
dream_Engine.camera.instance.updateProjectionMatrix()
dream_Engine.Physics.world.gravity.set(0, -9.81, 0)

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const BoxMaterial = new THREE.MeshStandardMaterial({ color: 'skyblue' , wireframe: false }); 

// Here we create an empty array to hold targets for the attribute 
// we want to morph

BoxGeometry.morphAttributes.position = [];

// Now initiate the position attribute with the original geometry
const positionAttribute = BoxGeometry.attributes.position

// For the morph target we will twist the cubes vertices
const twistPositions = [];
const direction = new THREE.Vector3(1, 0, 0);
const vertex = new THREE.Vector3();

for (let i = 0; i < positionAttribute.count; i++) {

    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    vertex.set( x * 2, y, z);
    vertex.applyAxisAngle(direction, Math.PI * x / 2).toArray(twistPositions, twistPositions.length);
}

BoxGeometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(twistPositions, 3);

const cubeMesh = dream_Engine.Mesh.CreateFromGeometry(
    BoxGeometry,
    BoxMaterial
);

dream_Engine.camera.instance.lookAt(cubeMesh.position);

console.log(cubeMesh);

dream_Engine.update = () => {
    cubeMesh.morphTargetInfluences[0] = Math.abs(Math.cos(dream_Engine.totalElapsedInSeconds));
}

dream_Engine.start()