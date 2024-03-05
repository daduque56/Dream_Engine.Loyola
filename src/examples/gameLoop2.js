import Logger from '../dream_Engine/Logger'

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

frame()

function sleep (millisecndos){
    const date = Date.now();
    let currentDate = null;
    do{
        currentDate = Date.now();  
    }
    while (currentDate - date < millisecndos);

    function frame(){
        now = Date.now()
        const dt = (now - late) / 1000

        const time_To_Wait = FIXED_TIME_STEP - dt
        if (time_To_Wait > 0 && time_To_Wait <= FIXED_TIME_STEP) {
            logger.info ("Waiting.")
            sleep(time_To_Wait * 1000)
        }
        if (time_To_Wait < 0)
            logger.error('I am late ' + time_To_Wait + 'ms.')

        player.position +=  player.speed
        if (player.speed > 100)
            player.position = 0

        logger.info('Player position: ' + player.position)

        last = now
        requestAnimationFrame(frame);
    }
}