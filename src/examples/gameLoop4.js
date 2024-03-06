import Dream_Engine from "../dream_Engine/Dream_Engine"
// Uncaught SyntaxError: Identifier 'Dream_Engine' has already been declared (at gameLoop4.js:3:7)
const stan = new Dream_Engine()

stan.update = (dt) => {
     stan.logger.info('My game loop works!')
     stan.logger.info('Last dt = ' + dt)
}

stan.start()
