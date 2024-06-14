import Dream_Engine from "../../dream_Engine/Dream_Engine";

const player = {
    speed: 10,
    position: {
        x: 0,
        y: 0
    }
}

window.addEventListener('mousemove', mouseMoveHandler)

function mouseMoveHandler (event) {
    console.log(event)
}

let rightMouseDown = false;
let leftMouseDown = false;

window.addEventListener('contextmenu', (event) => {
    event.preventDefault(); 
});

window.addEventListener('mouseup', (event) => {
    if (event.button === 2) { 
        rightMouseDown = false;
        console.log("---->> PLayer stopped aiming <<----");
    } else if (event.button === 0) { 
        leftMouseDown = false;
        console.log("---->> Player stopped shooting <<----");
    }
});

window.addEventListener('mousedown', (event) => {
    if (event.button === 2) { 
        rightMouseDown = true;
    } else if (event.button === 0) { 
        leftMouseDown = true;
    }
});

setInterval(() => {
    if (rightMouseDown) {
        console.log("---->> Player is aiming <<----");
    }
    if (leftMouseDown) {
        console.log("---->> Player is shooting <<----");
    }
}, 100);

const dream_Engine = new Dream_Engine()

dream_Engine.update = (dt) => {
    console.log (player.position)
    dream_Engine.handleArrowKeyInput(dt);
}

dream_Engine.handleArrowKeyInput = (dt) => {
    if (dream_Engine.input.areArrowKeysPressed()) {
        if (dream_Engine.input.isKeyPressed('KeyD')){
            player.position.x  += player.speed * dt;
            console.log("---->> Player moved to the right <<----")
        }
        if (dream_Engine.input.isKeyPressed('KeyW')){
            player.position.y  += player.speed * dt;
            console.log("---->> Player moved up <<----")
        }
        if (dream_Engine.input.isKeyPressed('KeyA')){
            player.position.x  -= player.speed * dt;
            console.log("---->> Player moved to the left <<----")
        }
        if (dream_Engine.input.isKeyPressed('KeyS')){
            player.position.y  -= player.speed * dt;
            console.log("---->> Player moved down <<----")
        }
        if (dream_Engine.input.isKeyPressed('Space')){
            console.log("---->> Player jumped <<----")
        }
        if (dream_Engine.input.isKeyPressed('KeyR')){
            console.log("---->> Player is reloading <<----")
        }
        if (dream_Engine.input.isKeyPressed('KeyE')){
            console.log("---->> Player is interacting <<----")
        }
        if (dream_Engine.input.isKeyPressed('KeyF')){
            console.log("---->> Player is using an ability <<----")
        }
        if (dream_Engine.input.isKeyPressed('Escape')){
            console.log("---->> Player paused the game <<----")
        }
        if (dream_Engine.input.isKeyPressed('Shift')){
            console.log("---->> Player is sprinting <<----")
        }
    }
}

dream_Engine.start()
    
