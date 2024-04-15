import *  as THREE from 'three'

export default class Light {

    constructor(Dream_Engine) 
    {
        this.scene = Dream_Engine.scene
        this.logger = Dream_Engine.logger
        this.logger.info('Light constructor called')
    }

    CreateAmbientLight(color, intensity) {
        //castShadow = true;
        const light = new THREE.AmbientLight(color, intensity)
        this.scene.add(light)
        return light
    }

    CreateDirectionalLight(color, intensity) {
        //castShadow = true;
        const light = new THREE.DirectionalLight(color, intensity)
        this.scene.add(light)
        return light
    }   

    CreatePointLight(color, intensity, distance, decay) {
        //castShadow = true;
        const light = new THREE.PointLight(color, intensity, distance, decay)
        this.scene.add(light)
        return light
    }   

    CreateLightHelper(Light){
        const light = new THREE.LightHelper(Light)
        const helper = new THREE.DirectionalLightHelper(Light, 5)
        this.scene.add(helper)
        return helper

    }

    CreateDirectionalLightHelper(Light){
        const helper = new THREE.DirectionalLightHelper(Light, 5)
        this.scene.add(helper)
        return helper
    }

    CreatePointLightHelper(PointLight, sphereSize){
        const helper = new THREE.PointLightHelper(PointLight, sphereSize)
        this.scene.add(helper)
        return helper
    }
}