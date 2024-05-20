import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Dream_Engine from "../dream_Engine/Dream_Engine"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ------------------------------------------------------------------------->> INICIALIZACION Y CAMARA  
const game = new Dream_Engine()
game.camera.instance.position.set(200,200, 200);
game.camera.instance.rotation.order = 'YXZ';
game.camera.instance.rotation.y = Math.PI / 4;
game.camera.instance.rotation.x = Math.atan(-1 / Math.sqrt(2));  
game.camera.instance.zoom = 15
game.camera.instance.updateProjectionMatrix()
game.Physics.world.gravity.set(0, -9.81, 0)

// ------------------------------------------------------------------------->> MATERIALES
/*const waterMaterial = new CANNON.Material('water');
const plasticMaterial = new CANNON.Material('plastic');
const waterPlasticContact = new CANNON.ContactMaterial(waterMaterial, plasticMaterial, 
    {
        friction: 0.1,
        restitution: 0.3,
        contactEquationStiffness: 1e7,
        contactEquationRelaxation: 3,
        frictionEquationRelaxation: 3
    }
)
game.Physics.world.addContactMaterial(waterPlasticContact)*/

const marMaterial = new CANNON.Material('water');
const barcoMaterial = new CANNON.Material('plastic');
const marBarcoContact = new CANNON.ContactMaterial(marMaterial, barcoMaterial, 
    {
        friction: 0.1,
        restitution: 0.2,
        contactEquationStiffness: 1e7,
        contactEquationRelaxation: 3,
        frictionEquationRelaxation: 3
    }
)
game.Physics.world.addContactMaterial(marBarcoContact)

// ------------------------------------------------------------------------->> LUCES
const ambientLight = game.Light.CreateAmbientLight('white', 1)
const directionalLight = game.Light.CreateDirectionalLight('white', 5)

directionalLight.position.set(0, 3, 0)

// ------------------------------------------------------------------------->> PLAYER
/*const gltfLoader = new GLTFLoader()
gltfLoader.load('/Models/Fox/Fox.gltf',(Fox) => {
        //foxModel = Fox;
        console.log('success')
        console.log(Fox)
        Fox.scene.scale.set(0.020, 0.025, 0.025)
        Fox.scene.position.set(0, 0.5, 0)
        Fox.scene.rotateY(Math.PI/2)

        console.log(Fox.scene.position);

    if (game.input.isKeyPressed('KeyD')){
        Fox.scene.position.x += 500 * dt
    }
    if (game.input.isKeyPressed('KeyA')){
        Fox.scene.position.x -= 500 * dt
    }
    if (game.input.isKeyPressed('KeyW')){
        Fox.scene.position.y +=  500 * dt
    }
    if (game.input.isKeyPressed('KeyS')){
        Fox.scene.position.y -= 500 * dt
    }

        game.scene.add(Fox.scene)
    }
)*/

const barco = game.createObject()
game.addComponentToObject(
    barco,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'crimson' })
    )
)
game.addComponentToObject(
    barco,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 2,
        shape: new CANNON.Box(new CANNON.Vec3(0.45, 0.4, 0.45)),
        material: barcoMaterial
    }) 
)
barco.rigidbody.position.set(0, 4, 0)
barco.receiveShadow = true
barco.castShadow = true 

// ------------------------------------------------------------------------->> GRID Y MAR
const gridHelper = game.Mesh.CreateGridHelper(80, 80, 'gray', 'white')
//gridHelper.rotateY(Math.PI/4)
const mar = game.createObject()
game.addComponentToObject(
    mar,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(80, 5, 80),
        new THREE.MeshPhongMaterial({ color: 'darkblue', transparent: true, opacity: 0.7   })
    )
)
game.addComponentToObject(
    mar,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(40, 2.5, 40)),
        material: marMaterial
    })
)
mar.receiveShadow = true
mar.rigidbody.position.set(0, -2.5, 0)

// ------------------------------------------------------------------------->> OBSTACLES
/*const spawn = game.createObject()
game.addComponentToObject(
    spawn,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(1, 3, 1),
        new THREE.MeshStandardMaterial({ color: 'white' })
    )
)
game.addComponentToObject(
    spawn,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 1.5, 0.5))
    })
)
spawn.castShadow = true

const spawnBase = game.createObject()
game.addComponentToObject(
    spawnBase,
    'mesh',
    game.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(3, 0.3,3 ),
        new THREE.MeshStandardMaterial({ color: 'green' })
    )
)
game.addComponentToObject(
    spawnBase,
    'rigidbody',
    game.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(1.5, 0.3, 1.5)),
        material: marMaterial
    })
)
spawnBase.rigidbody.position.set(0, 1.5, 0)
spawnBase.castShadow = true*/

function CreateStructure(x, z) {
    const spawn = game.createObject();
    game.addComponentToObject(
        spawn,
        'mesh',
        game.Mesh.CreateFromGeometry(
            new THREE.BoxGeometry(1, 3, 1),
            new THREE.MeshStandardMaterial({ color: 'white' })
        )
    );
    game.addComponentToObject(
        spawn,
        'rigidbody',
        game.Physics.CreateBody({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(0.5, 1.5, 0.5))
        })
    );
    spawn.rigidbody.position.set(x, spawn.rigidbody.position.y, z);
    spawn.castShadow = true;

    const spawnBase = game.createObject();
    game.addComponentToObject(
        spawnBase,
        'mesh',
        game.Mesh.CreateFromGeometry(
            new THREE.BoxGeometry(3, 0.3,3 ),
            new THREE.MeshStandardMaterial({ color: 'green' })
        )
    );
    game.addComponentToObject(
        spawnBase,
        'rigidbody',
        game.Physics.CreateBody({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(1.5, 0.3, 1.5)),
            material: marMaterial
        })
    );
    spawnBase.rigidbody.position.set(x, 1.5, z);
    spawnBase.castShadow = true;
}

CreateStructure(0,0);
CreateStructure(10,10);
CreateStructure(-10,-10);
CreateStructure(10,-10);
CreateStructure(-10,10);
CreateStructure(0,25)
CreateStructure(0,-25)
CreateStructure(25,0)
CreateStructure(-25,0)


// ------------------------------------------------------------------------->> ENEMIGOS
let enemigos = []


//---------------------------------------------------------------------------
game.start()

// ------------------------------------------------------------------------->> LOGS DE COLISIONES

barco.rigidbody.addEventListener('collide', (e) => {
    if (e.body === spawn.rigidbody) {
        console.log('barco esta en spawnpoint')
    }
    if (e.body === mar.rigidbody) {
        console.log('barco esta en el mar')
    }
})

// ------------------------------------------------------------------------->> tests
    console.log(spawnBase.rigidbody.position.y , spawnBase.rigidbody.position.y)

// ---------------------------------------------------------------------------
game.update = (dt) => {

    
    
    if (game.input.isKeyPressed('KeyW') || game.input.isKeyPressed('ArrowUp')) {
        barco.rigidbody.position.z -= 0.07
        game.camera.instance.position.z -= 0.07
        //barco.rigidbody.applyForce(new CANNON.Vec3(0, 0, -20))
    }
    if (game.input.isKeyPressed('KeyS')|| game.input.isKeyPressed('ArrowDown')) {
        barco.rigidbody.position.z += 0.07
        game.camera.instance.position.z += 0.07
        //barco.rigidbody.applyForce(new CANNON.Vec3(0, 0, 20))
    } 
    if (game.input.isKeyPressed('KeyA') || game.input.isKeyPressed('ArrowLeft')) {
        barco.rigidbody.position.x -= 0.07
        game.camera.instance.position.x -= 0.07
        //barco.rigidbody.applyForce(new CANNON.Vec3(-20, 0, 0))
    }   
    if (game.input.isKeyPressed('KeyD') || game.input.isKeyPressed('ArrowRight')) {
        barco.rigidbody.position.x += 0.07
        game.camera.instance.position.x += 0.07
        //barco.rigidbody.applyForce(new CANNON.Vec3(30, 0, 0))
    }
    if (game.input.isKeyPressed('Space')) {
        if (barco.rigidbody.position.y <= 1.5 || barco.rigidbody.position.y <= 3 && barco.rigidbody.position.y != 3.5)
        {
            barco.rigidbody.applyForce(new CANNON.Vec3(0, 20, 0))
        }  
    }
    if (game.input.isKeyPressed('KeyF') && enemigos.length < 3) {
        const tiburon = game.createObject()
        game.addComponentToObject(
            tiburon,
            'mesh',
            game.Mesh.CreateFromGeometry(
                new THREE.BoxGeometry(1, 0.5, 3),
                new THREE.MeshStandardMaterial({ color: 'gray' })
            )
        )
        game.addComponentToObject(
            tiburon,
            'rigidbody',
            game.Physics.CreateBody({
                mass: 1,
                shape: new CANNON.Box(new CANNON.Vec3(1, 0.25, 1.5))
            })
        )

        // Set the enemy's position to a random point within the specified radius around the barco object
        const radius = 5 // replace with the radius you want
        const angle = Math.random() * Math.PI * 2
        const x = barco.rigidbody.position.x + radius * Math.cos(angle)
        const z = barco.rigidbody.position.z + radius * Math.sin(angle)
        tiburon.rigidbody.position.set(x, barco.rigidbody.position.y, z)

        enemigos.push(tiburon)
    }
}       