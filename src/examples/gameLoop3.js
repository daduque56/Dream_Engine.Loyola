import Logger from "../dream_Engine/Logger";

const logger = new Logger()

let player = {
    position:0,
    speed:10
}

let last = Date.now()
let now = Date.now()

function frame (){
    now = Date.now()
    const dt = (now - last) / 1000

    player.position += player.speed * dt
    if(player.position > 100)
        player.position = 0

    Logger.info(
        "d:"
        + dt
        + "Player position: "
        + player.position
    )

    last = now
    requestAnimationFrame(frame)
}
    frame()
