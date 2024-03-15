import Logger from './Logger'

class Dream_Engine {
    constructor (){

        this.startTime = Date.now()
        this.lastFrameTime = this.startTime
        this.dt = 1/60
        this.totalElapsed = 0 
        this. totalElapsedInSeconds = 0 

        this.logger = new Logger ()
        this.logger.info ('Dream Engine constructor called')
    }
}

export default class Input {
    constructor (Dream_Engine){
        this.logger = Dream_Engine.logger
        this.logger.info('Input constructor called')

        this.keys = {};
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));

        this.arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Escape', 'KeyR', 'KeyE', 'KeyF'];
    }

    handleKeyDown(event) {
        this.keys[event.code] = true;
    }

    handleKeyUp(event) {
        this.keys[event.code] = false;
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    areArrowKeysPressed() {
        return this.arrowKeys.some(key => this.isKeyPressed(key));
    }
}

