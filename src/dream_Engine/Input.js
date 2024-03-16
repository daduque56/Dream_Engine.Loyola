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

        let rightMouseDown = false;
        let leftMouseDown = false;

        window.addEventListener('contextmenu', (event) => {
            event.preventDefault(); 
        });

        window.addEventListener('mouseup', (event) => {
            if (event.button === 2) { 
                rightMouseDown = false;
                console.log("Right mouse button released");
            } else if (event.button === 0) { 
                leftMouseDown = false;
                console.log("Left mouse button released");
            }
        });

        window.addEventListener('mousedown', (event) => {
            if (event.button === 2) { 
                rightMouseDown = true;
            } else if (event.button === 0) { 
                leftMouseDown = true;
            }
        });

        setInterval(() => {
            if (rightMouseDown) {
                console.log("Right mouse button is being pressed");
            }
            if (leftMouseDown) {
                console.log("Left mouse button is being pressed");
            }
        }, 100);

        this.arrowKeys = ['ArrowUp',
                          'ArrowDown',
                          'ArrowLeft',
                          'ArrowRight', 
                          'Space', 
                          'Escape', 
                          'KeyR', 
                          'KeyE', 
                          'KeyF',
                          'KeyW',
                          'KeyA',
                          'KeyS',
                          'KeyD'];
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

