import { Model, DataTypes, } from 'sequelize'
import Config from '../../app/config/DataSource.js'
 
export class DirctoryEntity extends Model {
    id!: number;
    dirName!: string;
    status!: boolean;
}

DirctoryEntity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dirName: { type: DataTypes.STRING, unique: true },
    status: { type: DataTypes.BOOLEAN },
}, {
    sequelize: Config.sequelize(),
    modelName: 'directories',
    timestamps: false
})

