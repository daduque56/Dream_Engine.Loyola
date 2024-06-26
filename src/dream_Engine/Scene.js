// import { Object3D } from '../core/Object3D.js';
//import { Euler } from '../math/Euler.js';
import * as THREE from 'three';
class Scene  {

	constructor() {

		this.isScene = true;

		this.type = 'Scene';

		this.background = null;
		this.environment = null;
		this.fog = null;

		this.backgroundBlurriness = 0;
		this.backgroundIntensity = 1;
		//this.backgroundRotation = new Euler();
		//this.environmentRotation = new Euler();

		this.overrideMaterial = null;

		if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

			__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) );
		}

		this.instance = new THREE.Scene();
	}

	add( object ) {
		this.instance.add(object);
	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		if ( source.background !== null ) this.background = source.background.clone();
		if ( source.environment !== null ) this.environment = source.environment.clone();
		if ( source.fog !== null ) this.fog = source.fog.clone();

		this.backgroundBlurriness = source.backgroundBlurriness;
		this.backgroundIntensity = source.backgroundIntensity;
		//this.backgroundRotation.copy( source.backgroundRotation );
		//this.environmentRotation.copy( source.environmentRotation );

		if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

		this.matrixAutoUpdate = source.matrixAutoUpdate;

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		if ( this.fog !== null ) data.object.fog = this.fog.toJSON();
		if ( this.backgroundBlurriness > 0 ) data.object.backgroundBlurriness = this.backgroundBlurriness;
		if ( this.backgroundIntensity !== 1 ) data.object.backgroundIntensity = this.backgroundIntensity;

		//data.object.backgroundRotation = this.backgroundRotation.toArray();
		//data.object.environmentRotation = this.environmentRotation.toArray();

		return data;

	}

}

export { Scene };