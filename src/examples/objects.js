import * as THREE from 'three'
import Dream_Engine from '../dream_Engine/Dream_Engine.js'

const game = new Dream_Engine()
game.camera.instance.position.set(200, 200, 200);
game.camera.instance.rotation.order = 'YXZ';
game.camera.instance.rotation.y = Math.PI / 4;
game.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  

game.camera.instance.zoom = 20
game.camera.instance.updateProjectionMatrix()

const ambientLight = game.Light.CreateAmbientLight('white', 1)
ambientLight.position.set(-4, 5, 0)
const directionalLight = game.Light.CreateDirectionalLight('white', 1)
directionalLight.position.set(0, 5, -4)
const ambientLightHelper = game.Light.CreatePointLightHelper(ambientLight)
const directionalLightHelper = game.Light.CreateDirectionalLightHelper(directionalLight)

game.scene.add(directionalLight, ambientLight, ambientLightHelper, directionalLightHelper)

const player = game.createObject()

game.addComponentToObject(
    player,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 'cornflowerblue',
            wireframe: false
        })
    )
)
game.addComponentToObject(
    player,
    'transform',
    {
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
    }
)
game.addComponentToObject(
    player,
    'rigidbody',
    {
        mass: 1,
        shape: 'box',
        width: 1,
        height: 1,
        depth: 1
    }
)
game.addComponentToObject(
    player,
    'collider',
    {
        type: 'box',
        width: 1,
        height: 1,
        depth: 1

    }
)
game.camera.instance.lookAt(player.position);
console.log(player)

const Suelo = game.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({color: 'green'})
)
Suelo.rotateX(-Math.PI/2)
Suelo.position.set(0, -1, 0)

let rotacionTotal = 0

game.update = (dt) => {

    player.mesh.position.copy(player.position)  
    player.mesh.rotation.copy(player.rotation)
    
    if (game.input.isKeyPressed('KeyD')){
        player.position.x += 5 * dt
        game.logger.points("Player se mueve a la derecha")
    }
    if (game.input.isKeyPressed('KeyA')){
        player.position.x -= 5 * dt
        game.logger.points("Player se mueve a la izquierda")
    }
    if (game.input.isKeyPressed('KeyW')){
        player.position.z -=  5 * dt
        game.logger.points("Player se mueve hacia arriba")
    }
    if (game.input.isKeyPressed('KeyS')){
        player.position.z += 5 * dt
        game.logger.points("Player se mueve hacia abajo")   
    }
    if (game.input.isKeyPressed('KeyQ')){
        player.rotation.z += 10 * dt
        rotacionTotal += 10 * dt;
        if (rotacionTotal > 0) {
            game.logger.points("Esta rotando en sentido horario")
        }
    }
    if (game.input.isKeyPressed('KeyE')){
        player.rotation.z -= 10 * dt
        rotacionTotal += 10 * dt;
        if (rotacionTotal > 0) {
            game.logger.points("Esta rotando en sentido contra horario")
        }
    }

}

game.start()