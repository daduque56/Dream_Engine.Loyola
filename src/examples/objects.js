import * as THREE from 'three'
import Dream_Engine from '../dream_Engine/Dream_Engine.js'

const game = new Dream_Engine()
game.camera.instance.position.set(2, 3, 5)

const ambientLight = game.Light.CreateAmbientLight('white', 1)
const directionalLight = game.Light.CreateDirectionalLight('white', 1)
directionalLight.position.set(5, 3, 3)

const player = game.createObject()
game.addComponentToObject(
    player,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 'cornflowerblue'
        })
    )
)

console.log(player)

game.update = (dt) => {
    player.rotateY(dt)
}

game.start()