import {Books, Directory} from '../../factory/models/index.js'
class DataSource {
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
            models: [Books,Directory]
            
        }

    }
}


export default new DataSource()