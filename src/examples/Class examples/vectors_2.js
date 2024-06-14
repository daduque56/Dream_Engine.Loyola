import Dream_Engine from "../../dream_Engine/Dream_Engine";
import * as THREE from 'three'

const dream_Engine = new Dream_Engine()
dream_Engine.camera.instance.position.set(5, 5, 15);

const axesHelper = dream_Engine.Mesh.CreateAxesHelper()

const gridHelper = dream_Engine.Mesh.CreateGridHelper(10, 10)
gridHelper.position.z = 0
gridHelper.position.x = 5

const arrowHelper = dream_Engine.Mesh.CreateArrowHelper()

arrowHelper.setDirection(new THREE.Vector3(1, 1, 1))
arrowHelper.position.set(0, 0, 0)
arrowHelper.rotateX(Math.PI / 2)    
arrowHelper.rotateY(Math.PI / 4)
arrowHelper.setColor('yellow')
arrowHelper.setLength(2)

const planeMesh = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({ color: 'gray', wireframe: false})
)
planeMesh.rotateX(-Math.PI / 2)
planeMesh.position.x = 5
planeMesh.position.z = -1.2


const player = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: false})
)
player.position.set(5, 1, 0)


const enemy = dream_Engine.Mesh.CreateFromGeometry(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red', wireframe: false})
)
enemy.position.set(-5, 1, 0)
enemy.add(axesHelper)
enemy.add(arrowHelper)

dream_Engine.update = (dt) => {
   let distance = new THREE.Vector3()
   distance.subVectors(player.position, enemy.position)
   enemy.position.add(distance.multiplyScalar(dt))

   enemy.lookAt(player.position)    
}

dream_Engine.start()