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
        //castShadow = true;
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        return mesh;
    }

    CreateAxesHelper (size) 
    {
        const axesHelper = new THREE.AxesHelper(size);
        this.scene.add(axesHelper);
        return axesHelper;
    }

    CreateGridHelper (size, divisions, color1, color2) {    

        const gridHelper = new THREE.GridHelper(size, divisions, color1, color2);
        this.scene.add(gridHelper);
        return gridHelper;
    }

    CreateArrowHelper ( dir, origin, length, hex) {

        const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
        this.scene.add(arrowHelper);
        return arrowHelper;
    }   
}

