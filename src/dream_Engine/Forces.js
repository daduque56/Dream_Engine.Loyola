import * as CANNON from 'cannon-es';
GenerateGravitational(pA, pB, mA, mB, G, minDistance, maxDistance);{
    // Calculate the distance between the two objects
    let distance = pB.clone()
    distance.sub(pA)
    let distanceSquared = distance.lengthSq()

    // Clamp the values of the distance (to allow for some interesting effects)
    distanceSquared = Math.min(Math.max(distanceSquared, minDistance))

    // Calculate the direction of the attraction force
    distance.normalize()

    // Calculate the strenght of the attraction force
    const attractionMagnitude = G * mA * mB / distanceSquared

    // Calculate the final resulting attration force vector
    const gravitationalForce = distance.mulitplyScalar(attractionMagnitude)

    return gravitationalForce
}
GenerateDrag(k, objectVelocity);{
    let dragVector = new CANNON.Vec3()
    // We only apply the friction force if the object is moving
    if (objectVelocity.lenghtSquared() > 0){

        // Calculate the drag force direction (Inverse of the velocity unit vector)
        let dragDirection = objectVelocity.clone()
        dragDirection.normalize()
        dragDirection = dragDirection.negate()

        // Calculate the drag force magnitude k * |v|^2
        const dragMagnitude = k * objectVelocity.lengthSquared()

        // Calculate the final drag force vector, direction and magnitude
        dragVector = dragDirection.scale(dragMagnitude)
    }
    return dragVector;
}
