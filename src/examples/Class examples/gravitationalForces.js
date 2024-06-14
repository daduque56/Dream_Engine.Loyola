import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Dream_Engine from '../../dream_Engine/Dream_Engine'

const gameTest = new Dream_Engine() 
gameTest.camera.instance.position.set(40, 50, 70)

const G = 9.81
const initialConditions = [
    {
        color: 'purple',
        mass: 1000,
        radius: 2, 
        position: new THREE.Vector3(),
        initialVelocity: new CANNON.Vec3(),
    }
]
const celestialBodies = []

const origin = gameTest.createObject()


const gridHelper = gameTest.Mesh.CreateGridHelper(100, 10, 'darkslategray', 'darkslategray')
const ambientLight = gameTest.Light.CreateAmbientLight('white', 1)
const arrowHelper = gameTest.Mesh.CreateArrowHelper(
    new THREE.Vector3(),
    new THREE.Vector3(),
    10,
    'red'
)

for (const body of initialConditions)
    {
        const entity = gameTest.createObject()
        gameTest.addComponentToObject(
            entity,
            'mesh',
            gameTest.Mesh.CreateFromGeometry(
                new THREE.SphereGeometry(body.radius, 32, 16),
                new THREE.MeshStandardMaterial({ color: body.color })
            )
        )
        gameTest.addComponentToObject(
            entity,
            'rigidbody',
            gameTest.Physics.CreateBody({
                mass: body.mass,
                shape: new CANNON.Sphere(body.radius)
            })
        )
        entity.position.copy(body.position)
        entity.rigidbody.velocity.copy(body.initialVelocity)
        celestialBodies.push(entity)
    }
gameTest.start()

gameTest.update = (dt) => {
    for (let i = 0; i < celestialBodies.length; i++)
    {
        for (let j = 0; j < celestialBodies.length; j++)
            {
            const gameObjectA = celestialBodies[i]
            const gameObjectB = celestialBodies[j]
            if (gameObjectA.rigidbody && gameObjectB.rigidbody)
            {
                const gravitationalForce = gameTest.Forces.GenerateGravitational(
                    gameObjectA.position,   
                        gameObjectB.position,
                        gameObjectA.rigidbody.mass,
                        gameObjectB.rigidbody.mass,
                        G,
                        1,
                        100
                    )
                gameObjectA.rigidbody.applyForce(gravitationalForce)
                gameObjectB.rigidbody.applyForce(gravitationalForce.negate())
            }
        }
    }
    arrowHelper.position.copy(celestialBodies[1].position)
    const totalForceUnitVector = new THREE.Vector3().copy(celestialBodies[1].rigidbody.force).normalize()
    arrowHelper.setDirection(totalForceUnitVector)
}