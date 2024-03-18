import * as THREE from 'three'

export default class Camera
{
    constructor (scene, Dream_Engine)
    {
        this.logger = Dream_Engine.logger
        this.logger.info("Camera constructor called")
        this.window = Dream_Engine.window
        this.scene = scene;

        /*this.instance = new THREE.OrthographicCamera(
            -this.window.width,
            this.window.width,
            this.window.height,
            -this.window.height,
        )*/
        
        this.instance = new THREE.PerspectiveCamera(45, this.window.aspectRatio, 1, 1000)

        this.scene.add(this.instance)

        this.instance.position.set(100, 100, 125);
    }

    resize()
    {
        this.instance.aspect = this.window.aspectRatio
        this.instance.updateProjectionMatrix()
    }
}