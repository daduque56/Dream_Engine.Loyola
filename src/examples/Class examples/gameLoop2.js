import Logger from '../../dream_Engine/Logger'

const logger = new Logger()

const FPS = 1
const FIXED_TIME_STEP = 1 / FPS
let player = {
    position: 0,
    speed: 10
}

let game_running = true
let last = Date.now()
let now = Date.now()
let dt = 0 

function sleep (milliseconds){
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();  
    } while (currentDate - date < milliseconds);
}

frame()

    function frame()
    {
        now = Date.now()
        const dt = (now - last) / 1000
        const time_to_Wait = FIXED_TIME_STEP - dt
        if (time_to_Wait > 0 && time_to_Wait <= FIXED_TIME_STEP) 
        {
            logger.info ("Waiting.")
            sleep(time_to_Wait * 1000)
        }
    }

    //if (time_to_Wait < 0)
       //     logger.error('I am late ' + time_to_Wait + 'ms.')

        player.position +=  player.speed

    if (player.speed > 100)
            player.position = 0

        logger.info('Player position: ' + player.position)

        last = now
        requestAnimationFrame(frame);
