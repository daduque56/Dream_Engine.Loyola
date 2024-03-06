import Dream_Engine from "../dream_Engine/Dream_Engine";

const worldWidth = 100
const player = {
    speed: 10,
    position: {
        x: 0,
        y: 0
    }
}
//Uncaught SyntaxError: Identifier 'Dream_Engine' has already been declared (at keyboard-controlled-movement.js:12:7)
const Dream_Engine = new Dream_Engine()

Dream_Engine.update = (dt) => {
    console.log (player.position)

    if (Dream_Engine.input.isKeyPressed('Arrow right')) 
    {
        player.position.x += player.speed * dt
    }
    if (Dream_Engine.input.isKeyPressed('ArrowLeft')) 
    {
        player.position.x -= player.speed * dt
    }
    if (Dream_Engine.input.isKeyPressed('ArrowUp'))
    {
        player.position.x += player.speed * dt
    }
    if (Dream_Engine.input.isKeyPressed('ArrowDown'))
    {
        player.position.x -= player.speed * dt
    }
}

Dream_Engine.start()
