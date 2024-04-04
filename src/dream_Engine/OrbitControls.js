import Dream_Engine from "./Dream_Engine";
import * as THREE from 'three'

export default class Camera{
    constructor (Dream_Engine){

    this.logger = Dream_Engine.logger
    this.logger.info("Camera constructor called")
    this.window = Dream_Engine.window
    this.scene = Dream_Engine.scene;

    this.instance = new THREE.PerspectiveCamera(45, this.window.aspectRatio, 1, 1000)
    this.scene.add(this.instance)
    }

    setOrbitControls(canvas){
        this.controls = new THREE.OrbitControls(this.instance, canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.window.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    frame(){
        if(this.controls && this.controls.enabled){
            this.controls.update()
        }
    }
}