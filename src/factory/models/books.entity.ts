import { Model, DataTypes, } from 'sequelize'
import Config from '../../app/config/DataSource.js'
import { DirctoryEntity } from './directory.entity.js'


export class BooksEntity extends Model{
    id!: number;
    bookName!: string;
    slug!: string;
    directoryId!: number;
}

BooksEntity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookName: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING, unique: true },
    directoryId: {
        type: DataTypes.INTEGER, 
        references: {
            model: DirctoryEntity,
            key: 'id'
        }
    },

}, {
    sequelize: Config.sequelize(),
    modelName: 'books',
    timestamps:false

})
export const DirRelation = DirctoryEntity.hasMany(BooksEntity);