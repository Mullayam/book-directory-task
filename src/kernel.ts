import { AppServer } from "./app/bootstrap.js";
import { Logging } from "./app/logs/index.js";
import Config from "./factory/index.js";

export class Kernel extends AppServer {

    constructor() {
        super(7134);
        this.LoadInstances()
    }
    /**
     * Loads instances and prepares them for launch.
     *
     * @private
     */
    private LoadInstances() {
        Logging.log("Preparing Instance To Launch")
        new Config()
    }

    InitailizeApplication() {
        Logging.info("InitailizeApplication")
        AppServer.RunApplication()
    }

}