import Dream_Engine from "../dream_Engine/Dream_Engine"

const stan = new Dream_Engine()

stan.update = (dt) => {
     stan.logger.info('My game loop works!')
     stan.logger.info('Last dt = ' + dt)
}

stan.start()