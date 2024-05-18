import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../dream_Engine/Dream_Engine";

const bounceGame = new Dream_Engine();
bounceGame.camera.instance.position.set(0, 10, 20);
bounceGame.Physics.world.gravity.set(0, -9.81, 0);

// ------------------------------------------> LUCES
const ambientLight = bounceGame.Light.CreateAmbientLight('white', 1);
const directionalLight = bounceGame.Light.CreateDirectionalLight('white', 1);


// ------------------------------------------> JUGADOR
const bouncyBall = bounceGame.createObject();
bounceGame.addComponentToObject(
    bouncyBall,
    'mesh',
    bounceGame.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1),
        new THREE.MeshStandardMaterial({ color: 'crimson'})
    )
)
bounceGame.addComponentToObject(
    bouncyBall,
    'rigidbody',
    bounceGame.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1)
    })
)
bouncyBall.mesh.position.set(0, 7, 0);

// ------------------------------------------> PISO
const floor = bounceGame.createObject("floor");
bounceGame.addComponentToObject(
    floor,
    'rigidbody',
    bounceGame.Physics.CreateBody({mass: 0, shape: new CANNON.Plane()})
)
bounceGame.addComponentToObject(
    floor,
    'mesh',
    bounceGame.Mesh.CreateFromGeometry(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({color: 'gray'})
    )
)
floor.mesh.position.set(0, -3, 0);  
floor.mesh.rotateX(-Math.PI / 2);

bounceGame.update(() => {
    bouncyBall.mesh.position.copy(bouncyBall.rigidbody.position);
    bouncyBall.mesh.quaternion.copy(bouncyBall.rigidbody.quaternion);
})

bounceGame.camera.instance.lookAt(0, 0, 0);

bounceGame.start();