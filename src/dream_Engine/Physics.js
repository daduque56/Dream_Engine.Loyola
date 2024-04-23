import * as CANNON from 'cannon-es';

export default class Physics {
    constructor(dream_Engine) {
        this.scene = dream_Engine.scene;
        this.world = new CANNON.World();
        this.logger = dream_Engine.logger;
        this.logger.info("Physics constructor called");     
}

Update(dt, objects)
{
    this.world.step(1 / 60, dt, 3);

    for (const object of objects)
    {
        if (object.rigidBody)
        {
            object.position.copy(object.rigidBody.position);
            object.quaternion.copy(object.rigidBody.quaternion);
        }
    }
}

CreateBody(options){
    const body = new CANNON.Body(options);
    this.world.addBody(body);
    return body;
}
}