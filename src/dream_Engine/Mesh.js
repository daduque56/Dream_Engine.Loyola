import * as THREE from 'three';

export default class Mesh {
    constructor(Dream_Engine) {
        this.scene = Dream_Engine.scene;
        this.logger = Dream_Engine.logger;
        this.logger.info('Mesh constructor called');
    }

    CreateFromVertices (vertices, color) {
        const geometry = new THREE.BufferGeometry();

        const positionAttribute = new THREE.BufferAttribute(vertices, 3);
        geometry.setAttribute('position', positionAttribute);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    
        return mesh;
    }
    CreateFromGeometry (geometry, material) {
       
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    CreateAxesHelper () 
    {
        const axesHelper = new THREE.AxesHelper(30);
        this.scene.add(axesHelper);
        return axesHelper;
    }

    CreateGridHelper () {

        const size = 10;
        const divisions = 10;
        const color1 = 0x0000ff;
        const color2 = 0x00ff00;

        const gridHelper = new THREE.GridHelper(size, divisions, color1, color2);
        this.scene.add(gridHelper);
        return gridHelper;
    }

    CreateArrowHelper () {
        const dir = new THREE.Vector3(1, 1, 1);

        const origin = new THREE.Vector3(0, 0, 0);
        const length = 1;
        const hex = 0xffff00;

        const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
        this.scene.add(arrowHelper);
        return arrowHelper;
    }   
}

