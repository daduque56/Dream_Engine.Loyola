//import Stats from "stats.js";
import Input from "./Input";
import Logger from "./Logger";
import Renderer from "./Renderer";
import Window from "./Window";
import Camera from "./Camera";
import { Scene } from "./Scene";
import Mesh from "./Mesh";
import Light from "./Light";
import AssetManager from "./AssetManager";
import * as THREE from 'three';
import Physics from "./Physics";
import Forces from "./Forces";

class Dream_Engine {
    constructor() {

        // HELLO 
        
        this.objects = [];

        this.logger = new Logger()
        this.logger.info('Dream_Engine constructor called')

        this.startTime =Date.now()
        this.lastFrameTime = this.startTime
        this.dt = 1/60
        this.totalElapsed = 0
        this.totalElapsedInSeconds = 0
        this.isRunning = false;
        this.aspectRatio =  1;

        this.input = new Input(this);
        this.scene = new Scene;
        this.window = new Window(this);
        this.camera = new Camera(this.scene, this);
        this.renderer = new Renderer(this,this.scene);
        this.Mesh = new Mesh(this);
        this.Light = new Light(this);
        this.Physics = new Physics(this);
        this.Forces = new Forces(this);
        //this.OrbitControls = new OrbitControls(this);
        this.Assets = new AssetManager(this);
      

        //this.stats = new Stats();
        //this.stats.showPanel(0);

       // document.body.appendChild(this.stats.dom);

        this.update = (dt) => {
            this.handleArrowKeyInput(dt);
        };
    }
    frame (){
        window.requestAnimationFrame(() => {
            this.frame()
        })

        if (this.isRunning)
        {
            const now = Date.now()
            this.dt = (now - this.lastFrameTime) / 1000
            this.lastFrameTime = now
            this.totalElapsed = this.lastFrameTime - this.startTime
            this.totalElapsedInSeconds = this.totalElapsed / 1000

            this.update(this.dt)
        
            for (const object of this.objects){
                
                if (object.rigidbody){
                    object.position.copy(object.rigidbody.position)
                    object.quaternion.copy(object.rigidbody.quaternion)
                }
            }

            this.Physics.Update(this.dt, this.objects)
        }

        this.camera.frame()
        this.renderer.frame()
    }   
   
    start () {

        this.isRunning = true;
        this.logger.info('Dream_Engine starts');
       
        this.frame()
    }
    stop () {
        this.isRunning = false;
        this.logger.info('Dream_Engine stops');
    }
    handleArrowKeyInput(dt) {
        if (this.input.areArrowKeysPressed(dt)) {
            if (this.input.isKeyPressed('ArrowRight')) {

                console.log('ArrowRight pressed');
            }
            if (this.input.isKeyPressed('ArrowLeft')) {

                console.log('ArrowLeft pressed');
            }
            if (this.input.isKeyPressed('ArrowUp')) {

                console.log('ArrowUp pressed');
            }
            if (this.input.isKeyPressed('ArrowDown')) {

                console.log('ArrowDown pressed');
            }
        }
    }
    createObject() {
        let object = new THREE.Object3D()
        this.logger.info(
            'Created object' + object.name + '#' + object.id
        )
        this.objects.push(object)
        return object
    }
    getObjects(){
        return this.objects
    }
    getObjetcById(id){
        return this.objects.find(
            object => object.id == id
        )
    }
    addComponentToObject(object, componentName, data){
        data.objectID = object.id
        object [ componentName ] = data
    }
  
}

export {Dream_Engine as default}