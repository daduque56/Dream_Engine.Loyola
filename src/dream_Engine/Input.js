import Input from './Input'
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

        this.pressedKeys = {}

        window.addEventListener(
            "keydown",
            (event) => {
                this._setKeyValue(event.key, true)
            }
        )
    }

    _setKeyValue(key, value)
    {
        this.pressedKeys [key] = true
    }

    isKeyPressed(key)
    {
        return this.pressedKeys [keys]
    }
}
