import * as THREE from 'three' 
import Dream_Engine from '../dream_Engine/Dream_Engine.js'

const game = new Dream_Engine() 

const particle = game.createObject()
game.addComponentToObject
(
    particle,   
    'kinematics',
    {
        acceleration: new THREE.Vector3(0, -9.8, 0),   
        velocity: new THREE.Vector3(1, 0, 2),
    }
)

game.update = (dt) => {
    particle.kinematics.velocity.x += particle.kinematics.acceleration.x * dt
    particle.kinematics.velocity.y += particle.kinematics.acceleration.y * dt
    particle.kinematics.velocity.z += particle.kinematics.acceleration.z * dt

    particle.position.x += particle.kinematics.velocity.x * dt
    particle.position.y += particle.kinematics.velocity.y * dt
    particle.position.z += particle.kinematics.velocity.z * dt

    console.log(particle.position)
}

game.start()