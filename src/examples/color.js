import * as THREE from 'three'

const color1 = new THREE.Color();

const color2 = new THREE.Color( 0xff0000 );

const color3 = new THREE.Color("rgb(0, 255, 255");
const color4 = new THREE.Color("rgb(100%, 0%, 0%)");

const color5 = new THREE.Color('Skyblue');
const color6 = new THREE.Color("hsl(0, 100%, 50%)");

const color7 = new THREE.Color( 1, 0, 0 );

console.log(color1)
console.log(color2)
console.log(color3)
console.log(color4)
console.log(color5)
console.log(color7.add(color6))
