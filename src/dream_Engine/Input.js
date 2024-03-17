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

        // Listner de teclado
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));

        let rightMouseDown = false;
        let leftMouseDown = false;

        // Listener para evitar se abra el menu click derecho
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault(); 
        });

        // Listener para saber la posicion del mouse
        window.addEventListener('mousemove', mouseMoveHandler)
        function mouseMoveHandler (event) {
        console.log(event)
        }

        // Listener para saber si el mouse esta siendo presionado
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
                          'Shift', 
                          'KeyR', 
                          'KeyE', 
                          'KeyF',
                          'KeyW',
                          'KeyA',
                          'KeyS',
                          'KeyD',
                          'KeyC'];
    }

    // Eventos de teclado presiona y suelta

    handleKeyDown(event) {
        this.keys[event.code] = true;
    }

    handleKeyUp(event) {
        this.keys[event.code] = false;
    }

    // Eventos de teclas presionadas
    handleKeyDown(event) {
        this.keys[event.code] = true;
        if (event.code === 'ArrowUp') {
            console.log('The ArrowUp key was pressed');
        }
        if (event.code === 'ArrowDown') {
            console.log('The ArrowDown key was pressed');
        }
        if (event.code === 'ArrowLeft') {
            console.log('The ArrowLeft key was pressed');
        }
        if (event.code === 'ArrowRight') {
            console.log('The ArrowRight key was pressed');
        }
        if (event.code === 'Space') {
            console.log('The Space key was pressed');
        }
        if (event.code === 'Escape') {
            console.log('The Escape key was pressed');
        }
        if (event.code === 'Shift') {
            console.log('The Shift key was pressed');
        }
        if (event.code === 'KeyR') {
            console.log('The KeyR key was pressed');
        }
        if (event.code === 'KeyE') {
            console.log('The KeyE key was pressed');
        }
        if (event.code === 'KeyF') {
            console.log('The KeyF key was pressed');
        }
        if (event.code === 'KeyW') {
            console.log('The KeyW key was pressed');
        }
        if (event.code === 'KeyA') {
            console.log('The KeyA key was pressed');
        }
        if (event.code === 'KeyS') {
            console.log('The KeyS key was pressed');
        }
        if (event.code === 'KeyD') {
            console.log('The KeyD key was pressed');
        }
        if (event.code === 'KeyC') {
            console.log('The KeyC key was pressed');
        }
    }
    // Eventos teclas al soltar 
    handleKeyUp(event) {
        this.keys[event.code] = false;
        if (event.code === 'ArrowUp') {
            console.log('The ArrowUp key was released');
        }
        if (event.code === 'ArrowDown') {
            console.log('The ArrowDown key was released');
        }
        if (event.code === 'ArrowLeft') {
            console.log('The ArrowLeft key was released');
        }   
        if (event.code === 'ArrowRight') {
            console.log('The ArrowRight key was released');
        }
        if (event.code === 'Space') {
            console.log('The Space key was released');
        }   
        if (event.code === 'Escape') {
            console.log('The Escape key was released');
        }   
        if (event.code === 'Shift') {
            console.log('The Shift key was released');
        }   
        if (event.code === 'KeyR') {
            console.log('The KeyR key was released');
        }   
        if (event.code === 'KeyE') {
            console.log('The KeyE key was released');
        }   
        if (event.code === 'KeyF') {
            console.log('The KeyF key was released');
        }   
        if (event.code === 'KeyW') {
            console.log('The KeyW key was released');
        }   
        if (event.code === 'KeyA') {
            console.log('The KeyA key was released');
        }
        if (event.code === 'KeyS') {
            console.log('The KeyS key was released');
        }
        if (event.code === 'KeyD') {
            console.log('The KeyD key was released');
        }
        if (event.code === 'KeyC') {
            console.log('The KeyC key was released');
        }
    }
    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    areArrowKeysPressed() {
        return this.arrowKeys.some(key => this.isKeyPressed(key));
    }

    
}

