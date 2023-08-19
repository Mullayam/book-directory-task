import { Model, DataTypes, Optional } from 'sequelize'
import Config from '../index.js'
import { DirctoryEntity } from './directory.js'

type BookModelAttributes = {
    id: string,
    bookName: string,
    directoryId: string,

};
export class BooksEntity extends Model<BookModelAttributes> implements BookModelAttributes {
    declare id: string;
    declare bookName: string;
    declare directoryId: string;
    static associate(models: any) {
        BooksEntity.belongsTo(DirctoryEntity)
    }
}

BooksEntity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookName: { type: DataTypes.INTEGER },
    directoryId: {
        type: DataTypes.UUID, references: {
            model: DirctoryEntity,
            key: 'id'
        }
    },

}, {
    sequelize: Config.getConnection(),
    modelName: 'books',
})

