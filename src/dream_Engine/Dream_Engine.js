import Input from "./Input";
import Logger from "./Logger";
import Renderer from "./Renderer";
import Window from "./Window";
import Camera from "./Camera";
import { Scene } from "./Scene";

class Dream_Engine {
    constructor() {

        // HELLO 
        
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
        this.window = new Window(this.scene, this.window);
        this.scene = new Scene;
        this.renderer = new Renderer(this,this.scene);
        this.camera = new Camera(this.scene, this.window);
        
        

        this.update = (dt) => {
            this.handleArrowKeyInput(dt);
        };
    }

    start () {

        this.isRunning = true;
        this.logger.info('Dream_Engine starts');
       
        this.frame()
    }

    frame (){
        window.requestAnimationFrame(() => {
            this.frame()
        })

        const now = Date.now()
        this.dt = (now - this.lastFrameTime) / 1000
        this.lastFrameTime = now
        this.totalElapsed = this.lastFrameTime - this.startTime
        this.totalElapsedInSeconds = this.totalElapsed / 1000

        this.update(this.dt)
        
        this.renderer.frame()
    }

    handleArrowKeyInput() {
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

}

export {Dream_Engine as default}