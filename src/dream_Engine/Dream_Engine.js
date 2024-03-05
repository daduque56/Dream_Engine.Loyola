import Logger from "./Logger";

class Dream_Engine {
    constructor() {
        this.startTime =Date.now()
        this.lastFrameTime = this.startTime
        this.dt = 1/60
        this.totalElapsed = 0
        this.totalElapsedInSeconds = 0


        this.logger = new Logger()
        this.logger.info('Dream_Engine constructor called')

        this.update = () => {};
    }

    start () {
        this.isRunning = true
        this.logger.info('Dream_Engine starts')

        this.frame()
    }

    frame (){
        window.requestAnimationFrame(() => {
            this.frame()
        })

        const now = Date.now()
        this.dt = (now - thisLastFrameTime) / 1000
        this.lastFrameTime = now
        this.totalElapsed = this.lastFrameTime - this.startTime
        this.totalElapsedInSeconds = this.totalElapsed / 1000

        this.update(this.dt)
        
        this.renderer.frame()
    }

}

export {Dream_Engine as default}