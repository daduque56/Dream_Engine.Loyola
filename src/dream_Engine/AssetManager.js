import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class AssetManager extends THREE.EventDispatcher {
    constructor(dream_Engine) {
        super()

        this.scene = dream_Engine.scene
        this.logger = dream_Engine.logger
        this.logger.info("Assets Manager Constructor called")

        this.assets = {}
        this.toLoad = 0
        this.loaded = 0
        this.assetsReady = false

        this,loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
    }

    loadAssets(sources){
        this.toLoad = sources.length
        for (const source of sources){
            if (source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    get (name){
        return this.assets[name]
    }

    sourceLoaded(source, file)
    {
        this.assets[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad)
        {
            this.assetsReady = true
            this.dispatchEvent({
                type: 'ready',
            totalAssets: this.loaded,
            assets: this.assets
            })
        }
    }
}