import { CacheService } from "../cache/CacheService.js";
import { Logging } from "../logs/index.js";
;



export class Engine {

    constructor(){
        Logging.log("Initializing App Engine Cache/Kernel Services ");
        new CacheService()
        
    }
}