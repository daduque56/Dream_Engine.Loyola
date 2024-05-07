import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Dream_Engine from "../dream_Engine/Dream_Engine";

const gameTest = new Dream_Engine();
gameTest.camera.instance.position.set(15, 15, 26);
gameTest.Physics.world.gravity.set(0,-9.81,0);
gameTest.Physics.world.solver.iterations = 2;

const ambientLight = gameTest.Light.CreateAmbientLight('white', 1);
const directionalLight = gameTest.Light.CreateDirectionalLight('white', 1);

const anchor = gameTest.createObject();
gameTest.addComponentToObject(
    anchor,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.BoxGeometry(2, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'crimson' })
    )
)
gameTest.addComponentToObject(
    anchor,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 0,
        shape: new CANNON.Sphere(1)
    })
)
anchor.rigidbody.position.set(0, 10, 0);

const ball = gameTest.createObject();
gameTest.addComponentToObject(
    ball,
    'mesh',
    gameTest.Mesh.CreateFromGeometry(
        new THREE.SphereGeometry(1, 16, 16),
        new THREE.MeshStandardMaterial({ color: 'navy' })
    )
)

gameTest.addComponentToObject(
    ball,
    'rigidbody',
    gameTest.Physics.CreateBody({
        mass: 1,
        shape: new CANNON.Sphere(1)
    })
)
ball.rigidbody.position.set(5, 10 , 0);

const distanceConstraint = new CANNON.DistanceConstraint(
    anchor.rigidbody,
    ball.rigidbody, 
    5
);
gameTest.Physics.world.addConstraint(distanceConstraint);

const grid = gameTest.Mesh.CreateGridHelper(50, 50, 'white', 'darkslategray'); 

gameTest.camera.instance.lookAt(anchor.position);

const points = [];
points.push(anchor.position);
points.push(ball.position);

const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({color: 'white'})
);
gameTest.scene.instance.add(line);

gameTest.start();

gameTest.update = (dt) => {
    ball.rigidbody.applyForce(new CANNON.Vec3(0, -9.81,0));
    ball.rigidbody.applyForce(new CANNON.Vec3(-9.81, 0, 0));
    ball.rigidbody.applyForce(new CANNON.Vec3(0, 0, -9.81));

    ball.mesh.position.copy(ball.rigidbody.position);
    anchor.mesh.position.copy(anchor.rigidbody.position);
    line.geometry.dispose();
    line.geometry = new THREE.BufferGeometry().setFromPoints(points);
    //console.log(ball.rigidbody.position)
}