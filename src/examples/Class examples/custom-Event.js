import Dream_Engine from "../../dream_Engine/Dream_Engine";

const collisionEvent = new  Event ("colissionEvent")
window.addEventListener("collisionEvent", collisionHandler)
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

const dream_Engine = new Dream_Engine()

Dream_Engine.update = (dt) => {
    Dream_Engine.logger.debug(player.postion.x)
    player.postion.x += player.speed * dt

    if(player.postion.x > worldWidth) {
        window.dispatchEvent(collisionEvent)
    }
}

dream_Engine.start()