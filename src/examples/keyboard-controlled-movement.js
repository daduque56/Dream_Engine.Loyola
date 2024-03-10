import Dream_Engine from "../dream_Engine/Dream_Engine";

const player = {
    speed: 10,
    position: {
        x: 0,
        y: 0
    }
}

const dream_Engine = new Dream_Engine()

dream_Engine.update = (dt) => {
    console.log (player.position)
    dream_Engine.handleArrowKeyInput(dt);
}

dream_Engine.handleArrowKeyInput = (dt) => {
    if (dream_Engine.input.areArrowKeysPressed()) {
        if (dream_Engine.input.isKeyPressed('ArrowRight')){
            player.position.x  += player.speed * dt;
            console.log("Player moved to the right")
        }
        if (dream_Engine.input.isKeyPressed('ArrowUp')){
            player.position.x  += player.speed * dt;
            console.log("Player moved up")
        }
        if (dream_Engine.input.isKeyPressed('ArrowLeft')){
            player.position.y  -= player.speed * dt;
            console.log("Player moved to the left")
        }
        if (dream_Engine.input.isKeyPressed('ArrowDown')){
            player.position.y  -= player.speed * dt;
            console.log("Player moved down")
        }
    }
}

dream_Engine.start()
    
