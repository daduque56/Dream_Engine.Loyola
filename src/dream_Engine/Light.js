import *  as THREE from 'three'

export default class Light {

    constructor(Dream_Engine) 
    {
        this.scene = Dream_Engine.scene
        this.logger = Dream_Engine.logger
        this.logger.info('Light constructor called')
    }

    CreateAmbientLight(color, intensity) {
        const light = new THREE.AmbientLight(color, intensity)
        this.scene.add(light)
        return light
    }

    CreateDirectionalLight(color, intensity) {
        const light = new THREE.DirectionalLight(color, intensity)
        this.scene.add(light)
        return light
    }   

    CreatePointLight(color, intensity, distance, decay) {
        const light = new THREE.PointLight(color, intensity, distance, decay)
        this.scene.add(light)
        return light
    }   
    
}