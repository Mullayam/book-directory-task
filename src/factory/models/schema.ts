import { Model, DataTypes, Optional } from 'sequelize'
import Config from '../../app/config/DataSource.js'


type BookModelAttributes = {
    id: number,
    bookName: string,
    directoryId: string,

};
type DirectoryAttributes = {
    id: number,
    dirName: string,
    createdAt: string,
    status: string,

};
export class DirctoryEntity extends Model<DirectoryAttributes> implements DirectoryAttributes {
    id!: number;
    dirName!: string;
    createdAt!: string;
    status!: string;
    static associate(models: any) {
        DirctoryEntity.hasMany(BooksEntity)
    }
}

DirctoryEntity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dirName: { type: DataTypes.STRING, unique: true },
    createdAt: { type: DataTypes.DATEONLY },
    status: { type: DataTypes.BOOLEAN },
}, {
    sequelize: Config.sequelize(),
    modelName: 'directories2',
})
export class BooksEntity extends Model<BookModelAttributes> implements BookModelAttributes {
    declare id: number;
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
    bookName: { type: DataTypes.INTEGER, unique: true },
    directoryId: {
        type: DataTypes.INTEGER, references: {
            model: DirctoryEntity,
            key: 'id'
        }
    },

}, {
    sequelize: Config.sequelize(),
    modelName: 'books2',
})
