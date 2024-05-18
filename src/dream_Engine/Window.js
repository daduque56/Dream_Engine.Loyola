import { EventDispatcher } from "three";


export default class  Window extends  EventDispatcher{
    constructor (Dream_Engine){
        super();

         this.logger = Dream_Engine.logger
         this.logger.info("Sizes constructor called")
         this.width = window.innerWidth
         this.height = window.innerHeight
         this.aspectRatio = this.width / this.height
         this.PixelRatio = Math.min (window.devicePixelRatio, 2)

         window.addEventListener('resize', () => {
            this.width = window.innerWidth
         this.height = window.innerHeight
         this.aspectRatio = Math.min (window.devicePixelRatio, 2)

         this.dispatchEvent ({

            type: 'resize'
            
             })
        })
    }
}