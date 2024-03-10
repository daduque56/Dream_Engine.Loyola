import Logger from "../dream_Engine/Logger";

const logger = new Logger()

let player = {
    position:0,
    speed:10
}

let last = Date.now()
let now = Date.now()

function frame () {
    now = Date.now()
    const dt = (now - last) / 1000
    
    player.position += player.speed * dt
    // 1. Revisar constantemente que cuando la posición del jugador llegue a 100 avise que esta re setteando su posición 
    if(player.position > 100){
    logger.info("Player Position has been resetted")
    }  
    // 2. re settear la posición a 0
    if(player.position > 100)
        player.position = 0
    // 3. Mostrar el primer dt en 0
    logger.info(
        "d: "
        + dt
        + " Player position: "
        + player.position   
    )
    last = now
    requestAnimationFrame(frame)    
}

frame()