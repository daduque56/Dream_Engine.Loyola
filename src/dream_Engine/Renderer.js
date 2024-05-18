import * as THREE  from 'three'

export default class  Renderer{
    constructor(Dream_Engine){
        this.logger = Dream_Engine.logger
        this.logger.info("Renderer constructor called")
        this.window = Dream_Engine.window
        this.scene = Dream_Engine.scene.instance
        this.camera = Dream_Engine.camera.instance
        this.objects = Dream_Engine.objects;

        this.instance  = new THREE.WebGLRenderer({antialias: true})
        document.body.appendChild(this.instance.domElement)
        this.instance.setSize(
            this.window.width,
            this.window.height
        )
        this.instance.setPixelRatio(this.window.pixelRatio)

        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap

    }

    resize (){
        this.instance.setSize(
            this.window.width,
            this.window.height
        )
        this.instance.setPixelRatio(this.window.pixelRatio)
    }

    frame(){

        for (const object of this.objects){
            
            // Update the position and rotation of the helpers
           /* if (object.axesHelper.visible && object.axesHelper.visible){
                object.axesHelper.position.copy(object.position)
                object.axesHelper.quaternion.copy(object.quaternion)
            }*/

            // Updatin mesh position and rotation
            if(object.mesh){
                object.mesh.position.copy(object.position)
                object.mesh.quaternion.copy(object.quaternion)
            }
        }

        this.instance.render(this.scene, this.camera)
    }
}
