import Looger from '../engine/Looger'

const logger= new Logger()

let player = {

   position: 0,
   speed: 10
}

let last = Date.now()
let now = Date.now()

function frame() {

   now = Date.now()
   const dt = (now -last) /1000

   //To do: Input check

   //Update Physics
   player.position += player.speed * dt

   If (player.position > 100)
   player.position = 0


   //Render
   logger.info(
   "dt: "
   + dt
   + "Player position"
   + player.position
)

   // Call next frame
   last = now
   requestAnimationFrame(frame);

}

//Run!
frame()