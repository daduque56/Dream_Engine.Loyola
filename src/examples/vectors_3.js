import * as THREE  from 'three'
import Dream_Engine from '../dream_Engine/Dream_Engine'

const dream_Engine = new Dream_Engine()

dream_Engine.camera.instance.position.set(0, 11, 16)
dream_Engine.camera.instance.lookAt(new THREE.Vector3(0, 0, 0)) 

const plane = {
    mesh: dream_Engine.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: false })
    ), normal: new THREE.Vector3(0, 1, 0)
}

plane.mesh.rotateX(Math.PI / 2)

const ball = {
    radius: 0.5,
    direction: new THREE.Vector3(0, 0, 0),
    speed: 2,
    mesh: dream_Engine.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: 'crimson', wireframe: false })
    )
}
ball.mesh.position.set(-7, 7, 8)
ball.direction.subVectors(
    plane.mesh.position, 
    ball.mesh.position
)
.normalize()

const helpers = {
    planeNomral: dream_Engine.Mesh.CreateArrowHelper( 
        plane.normal, 
        plane.mesh.position, 
        3, 
        'blue'
    ),
    ballDirection: dream_Engine.Mesh.CreateArrowHelper(
        ball.direction,
        ball.mesh.position,
        2,
        'yellow'
    )
}

dream_Engine.update = function (dt) {
    ball.mesh.position.x += ball.direction.x * ball.speed * dt
    ball.mesh.position.y += ball.direction.y * ball.speed * dt
    ball.mesh.position.z += ball.direction.z * ball.speed * dt

    if (ball.mesh.position.y < ball.radius) {
        ball.direction.reflect(plane.normal)
    }

    helpers.ballDirection.position.copy(ball.mesh.position) 
    helpers.ballDirection.setDirection(ball.direction)
}

dream_Engine.start()