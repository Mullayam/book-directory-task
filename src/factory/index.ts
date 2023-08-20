import { Sequelize } from 'sequelize-typescript'
import DataSource from '../app/config/DataSource.js'
import { Books, Directory } from '../factory/models/index.js'

class Config {
    static sequelize: Sequelize

    constructor() {
        this.CreateConnection()
        this.PrepareConnection()
    }

    /**
     * Creates a new database connection using the provided configuration.   
     */
    private CreateConnection() {
        Config.sequelize = new Sequelize({ ...DataSource.sequelizeOptions(), models: [Books, Directory] })
    }
    /**
     * Prepares the connection to the database.
     *
     * @return {Promise<void>} - Resolves when the connection is successfully established, and rejects with an error message if the connection fails.
     */
    private async PrepareConnection(): Promise<void> {
        await Config.sequelize.authenticate().then(() => {
            this.Syncronization()
            console.log('Connection has been established successfully.')

        }).catch(() => { console.log("Unable to connect to the database") })

    }
    private async Syncronization() {
        Config.sequelize.sync().then(() => { console.log("Syncronization OK") }).catch((e) => { console.log("Syncronization error", e) })
    }
    /**
     * Closes the connection.       *
    
     * @return {void} No return value.
     */
    public static instance(): Sequelize {
        return Config.sequelize
    }
    static CloseConnection(): void {
        Config.sequelize.close()
    }


}
export default Config