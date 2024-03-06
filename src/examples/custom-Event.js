import Dream_Engine from "../dream_Engine/Dream_Engine";

const collisionEvent = new  Event ("colissionEvent")
window.addEventListener("collisonEvent", collisionHandler)
function collisionHandler (colissionEvent) {
    console.log("Resetting the position of the player")
    player.postion.x = 0
}

const worldWidth = 100 
const player = {
    speed: 10,
    postion: {
        x: 0,
        y: 0
    }
}
// Uncaught SyntaxError> Identifier 'Dream_Engine' has already been declared  at custom-Event.js:19:7
const Dream_Engine = new Dream_Engine()

Dream_Engine.update = (dt) => {
    Dream_Engine.logger.debug(player.postion.x)
    player.postion.x += player.speed * dt

    if(player.postion.x > worldWidth) {
        window.dispatchEvent(collisionEvent)
    }
}

Dream_Engine.start()
