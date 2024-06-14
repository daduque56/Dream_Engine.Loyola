import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Dream_Engine from "../../dream_Engine/Dream_Engine";

const game = new Dream_Engine();
game.camera.instance.position.set(9, 9, 20);
game.Physics.world.gravity.set(0, -9.51, 0);
// game.Physiscs.world.solver.iterations = 10;

const ambientLight = game.Light.CreateAmbientLight('white', 1);
const directionalLight = game.Light.CreateDirectionalLight('white', 1);

const dist = 1;
const mass = 0.5;
const rows = 8;
const cols = 8;

const bodies = {}; // bodies [i + j * cols] => particle
const pointsMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: false
});
for (let i = 0; i < cols; i++ ){
    for (let j = 0; j < rows; j++){
        // Create a new body 
        const body = game.createObject()
        game.addComponentToObject(
            body,
            'mesh',
            game.Mesh.CreateFromGeometry(
                new THREE.SphereGeometry(0.1,32,32),
                pointsMaterial
            )
        )
        game.addComponentToObject(
            body,
            'rigidbody',
            game.Physics.CreateBody({ 
                mass: j == rows - 1  ? 0 : mass,
                shape: new CANNON.Particle()
            })
        )
        body.position.set(dist * i, dist * j, dist * (i + j));
        body.rigidbody.velocity.set(0, 0, (Math.sin(i * 0.1) + Math.sin(j * 0.1)))
        bodies[`${i} ${j}`] = body;
        game.scene.add(body);
    }
} 
function connect(i1, j1, i2, j2){
    const distanceConstraint = new CANNON.DistanceConstraint(
        bodies[`${i1} ${j1}`].rigidbody,
        bodies[`${i2} ${j2}`].rigidbody,
        dist
    );
    game.Physics.world.addConstraint(distanceConstraint);
}

for (let i = 0 ; i < cols; i++){
    for(let j = 0; j < cols; j++){
        if (i < cols - 1) connect(i, j, i + 1, j);
        if (j < rows - 1) connect(i, j, i, j + 1);
    }
}

game.camera.instance.lookAt(0, 0, 0);

game.start();