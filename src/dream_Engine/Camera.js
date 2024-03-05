import * as THREE from 'three'

export default class Camera
{
    constructor (Dream_Engine)
    {
        this.logger = Dream_Engine.logger
        this.logger.info("Camera constructor called")
        this.window = Dream_Engine.window
        this.scene = Dream_Engine.scene

        this.instance = new THREE.OrthographicCamera(
            -this.window.width,
            this.window.width,
            this.window.height,
            -this.window.height,
        )
        this.instance.position.set(0, 0, 125)
        this.scene.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.window.aspectRatio
        this.instance.updateProjectionMatrix()
    }
}