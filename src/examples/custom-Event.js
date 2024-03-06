import Dream_Engine from "../dream_Engine/Dream_Engine";
import Dream_Engine from "../dream_Engine/Dream_Engine";

const collisionEvent = new  Event ("colissionEvent")
window.addEventListener("collisonEvent", collisionHandler)
function collisionHandler (colissionEvent) {
    console.log("Resetting the position of the player")
    player.postion.x = 0
}

const worldWitdh = 100 
const player = {
    speed: 10,
    postion: {
        x: 0,
        y: 0
    }
}

const Dream_Engine = new Dream_Engine()

Dream_Engine.update = (dt) => {
    Dream_Engine.logger.debug(player.postion.x)
    player.postion.x += player.speed * dt

    if(player.postion.x > worldWitdh) {
        window.dispatchEvent(collisionEvent)
    }
}

Dream_Engine.start()
