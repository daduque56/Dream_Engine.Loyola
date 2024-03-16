import Dream_Engine from "../dream_Engine/Dream_Engine"

const Dream_Engine = new Dream_Engine()

Dream_Engine.update = (dt) => {
     Dream_Engine.logger.info('My game loop works!')
     Dream_Engine.logger.info('Last dt = ' + dt)
}

Dream_Engine.start()