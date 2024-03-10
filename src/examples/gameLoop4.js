import Dream_Engine from "../dream_Engine/Dream_Engine"
// Uncaught SyntaxError: Identifier 'Dream_Engine' has already been declared (at gameLoop4.js:3:7)
const Dream_Engine = new Dream_Engine()

Dream_Engine.update = (dt) => {
     Dream_Engine.logger.info('My game loop works!')
     Dream_Engine.logger.info('Last dt = ' + dt)
}

Dream_Engine.start()