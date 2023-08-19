import { Sequelize ,DataTypes} from 'sequelize'
import Database from '../app/config/DataSource.js'
class Config {
    private connection: Sequelize
    constructor() {
        this.connection = Database.sequelize();
        this.CreateConnection()
    }    
    /**
     * Create a connection to the database and authenticate it.
     *
     * @private
     * @return {void}
     */
    private CreateConnection(): void {
        
        this.connection.authenticate().then(() => {
            this.connection.sync()
            console.log('Database Connection has been established successfully.')
        }).catch((error) => {
            throw new Error(`Unable to connect to the database: ${error}`)
        })

    }
    /**
     * Prepares the connection to the database.
     *
     * @return {Promise<void>} - Resolves when the connection is successfully established, and rejects with an error message if the connection fails.
     */
    static getConnection(): Sequelize {
        return this.prototype.connection;
    }
    /**
     * Closes the connection.       * 
    
     * @return {void} No return value.
     */
    static CloseConnection(): void {
        this.prototype.connection.close()
    }


}
export default Config;