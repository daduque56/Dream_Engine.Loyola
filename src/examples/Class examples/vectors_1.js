import * as THREE from 'three';

const v1  = new THREE.Vector3(3, 4, 0)
const v2  = new THREE.Vector3(-2, 7, 3)

console.log(v1)
console.log(v2)

console.log(v1.length)
console.log(v1.lengthSq())

console.log(v1.dot(v2))

v1.add(v2)
console.log(v1)