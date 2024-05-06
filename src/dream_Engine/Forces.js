import * as CANNON from 'cannon-es';

class Forces {
GenerateGravitational(pA, pB, mA, mB, G, minDistance, maxDistance) {
    
    let distance = pB.clone()
    distance.sub(pA)
    let distanceSquared = distance.lengthSq()


    distanceSquared = Math.min(Math.max(distanceSquared, minDistance))

   
    distance.normalize()

    
    const attractionMagnitude = G * mA * mB / distanceSquared

    
    const gravitationalForce = distance.mulitplyScalar(attractionMagnitude)

    return gravitationalForce
}
GenerateDrag(k, objectVelocity) {

    let dragVector = new CANNON.Vec3()
    
    if (objectVelocity.lengthSquared() > 0){
        
        let dragDirection = objectVelocity.clone()
        dragDirection.normalize()
        dragDirection = dragDirection.negate()

        const dragMagnitude = k * objectVelocity.lengthSquared()

        dragVector = dragDirection.scale(dragMagnitude)
    }
    return dragVector;
}
GenerateMagnusForce(spin, velocity, k) {

        let magnusForce = new CANNON.Vec3();

        magnusForce.cross(velocity, spin);
        
        let magnusMagnitude = velocity.length() * spin.length() * k;

        magnusForce = magnusForce.scale((magnusMagnitude));
        
        return magnusForce;
}
GenerateBuoyantForce(density, volume, g) {
    let buoyantForceMagnitude = density * volume * g;
    
    let buoyantForce = new CANNON.Vec3(0, buoyantForceMagnitude, 0);

    return buoyantForce;
}
GenerateTensionForce(k, displacement, length) {

    let tensionForceMagnitude = k * displacement.length() / length;
    

    let tensionForce = displacement.clone().negate().normalize().scale(tensionForceMagnitude);
    return tensionForce;
}
GenerateDampingForce(k, velocity) {
    let dampingForce = velocity.clone().negate().scale(k);
    return dampingForce;
}
}



export default Forces;