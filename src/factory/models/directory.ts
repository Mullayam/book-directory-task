import { Model, DataTypes } from 'sequelize'
import Config from '../index.js'
import { BooksEntity } from './books.js'

type BookModelAttributes = {
    id: string,
    dirName: string,
    createdAt: string,
    status: string,

};
export class DirctoryEntity extends Model<BookModelAttributes> implements BookModelAttributes {
    id!: string;
    dirName!: string;

    createdAt!: string;
    status!: string;
    static associate(models: any) {
        DirctoryEntity.hasMany(BooksEntity)
    }
}

DirctoryEntity.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    dirName: { type: DataTypes.STRING, unique: true },
    createdAt: { type: DataTypes.DATEONLY },
    status: { type: DataTypes.BOOLEAN },
}, {
    sequelize:Config.getConnection(),
    modelName: 'directories',
})
