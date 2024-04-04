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
        const axesHelper = new THREE.AxesHelper(2);
        this.scene.add(axesHelper);
        }
}

