import { Sequelize, Dialect } from "sequelize";
class DataSource {
     /**
     * Creates and returns a new Sequelize instance using the provided sequelizeOptions.
     *
     * @returns {Sequelize} A new Sequelize instance.
     */
     public sequelize(): Sequelize {
        const connection = new Sequelize(this.sequelizeOptions())        
        connection.sync()
        return connection;
    }
     /**
     * Returns the Sequelize options for connecting to the database.
     *
     * @return {object} - The Sequelize options object.
     */
     sequelizeOptions():object {
        return {
            dialect: process.env.DB_DRIVER  as string ,
            host: process.env.DB_HOST as string,
            username: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_NAME as string,
          
            
        }

    }
}


export default new DataSource()