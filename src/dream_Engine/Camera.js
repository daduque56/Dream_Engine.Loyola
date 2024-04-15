import * as THREE from 'three'

export default class Camera
{
    constructor (scene, Dream_Engine)
    {
        this.logger = Dream_Engine.logger
        this.logger.info("Camera constructor called")
        this.window = Dream_Engine.window
        this.scene = scene;

        // PacMan Orthographic example camera
        this.instance = new THREE.OrthographicCamera(
            -this.window.width,
            this.window.width,
            this.window.height,
            -this.window.height,
        )
        
        // Isometric example camera
        this.instance = new THREE.PerspectiveCamera(45, this.window.aspectRatio, 1, 1000)
        this.scene.add(this.instance)
        this.instance.position.set(125, 125, 125);
    }
    setOrbitControls(canvas){
        this.controls = new THREE.OrbitControls(this.instance, canvas)
        this.controls.enableDamping = true
    }
    frame(){
        if(this.controls && this.controls.enabled){
            this.controls.update()
        }
    }
    resize()
    {
        this.instance.aspect = this.window.aspectRatio
        this.instance.updateProjectionMatrix()
    }
}