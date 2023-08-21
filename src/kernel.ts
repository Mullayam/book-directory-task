import { AppServer } from "./app/bootstrap.js";
import { Logging } from "./app/logs/index.js";
import './factory/models/schema.js';
export class Kernel extends AppServer {

    constructor() {
        super(7134);       
    }  
    InitailizeApplication() {
        Logging.info("InitailizeApplication")
        AppServer.RunApplication()
    }

}