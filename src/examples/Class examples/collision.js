import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Dream_Engine from "../../dream_Engine/Dream_Engine"

const game = new Dream_Engine()
game.camera.instance.position.set(0, 10, 15)
game.Physics.world.gravity.set(0, -9.81, 0)

const ambientLight = game.Light.CreateAmbientLight('white', 0.5)
const directionalLight = game.Light.CreateDirectionalLight('white', 0.7)


const ball = game.createObject()
game.addComponentToObject(
    ball,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1),
        new THREE.MeshStandardMaterial({ color: 'crimson' })
    )
)
game.addComponentToObject(
    ball,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1)
    })
)
ball.castShadow = true
ball.rigidbody.position.set(0, 5, 0)

const gridHelper = game.Mesh.CreateGridHelper(10, 10, 'gray', 'white')
gridHelper.position.y = 0.15

const suelo = game.createObject()
game.addComponentToObject(
    suelo,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(10, 0.2, 10),
        new THREE.MeshPhongMaterial({ color: 'darkslategray', transparent: true, opacity: 1  })
    )
)
game.addComponentToObject(
    suelo,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(5, 0.1, 5))
    })
)
suelo.receiveShadow = true

console.log("ball Rb de update", ball.rigidbody.position);
console.log("ball mesh de update", ball.mesh.position);


game.camera.instance.lookAt(ball.mesh.position)

game.update = (dt) => {

}

game.start()