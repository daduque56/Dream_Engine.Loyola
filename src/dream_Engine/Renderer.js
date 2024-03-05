import * as THREE  from 'three'

export default class  Renderer{
    constructor(Dream_Engine){
        this.logger = Dream_Engine.logger
        this.logger.info("Renderer constructor called")
        this.window = Dream_Engine.window
        this.scene = Dream_Engine.scene
        this.camera = Dream_Engine.camera

        this,instance  = new THREE.WebGL1Renderer()
        document.body.appendChild(this.instance.domElement)
        this.instance.setSize(
            this.window.width,
            this.window.height
        )
        this.instance.setPixelRatio(this.window.pixelRatio)
    }

    resize (){
        this.instance.setSize(
            this.window.width,
            this.window.height
        )
        this.instance.setPixelRatio(this.window.pixelRatio)
    }

    frame(){
        this.instance.render(
            this.scene,
            this.camera.instance
        )
    }
}