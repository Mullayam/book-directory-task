import { Sequelize, Dialect } from "sequelize";
class Database {

    /**
     * Creates and returns a new Sequelize instance using the provided sequelizeOptions.
     *
     * @returns {Sequelize} A new Sequelize instance.
     */
    public sequelize(): Sequelize {
        const connection = new Sequelize(this.sequelizeOptions())
        return connection;
    }
    /**
     * Returns the Sequelize options for connecting to the database.
     *
     * @return {object} - The Sequelize options object.
     */
    private sequelizeOptions(): object {

        return {
            dialect: process.env.DB_DRIVER as Dialect,
            host: process.env.DB_HOST as string,
            username: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_NAME as string,
        }

    }
}
 

export default new Database()