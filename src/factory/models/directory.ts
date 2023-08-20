
import { Table, Column, Model, HasMany, PrimaryKey,AutoIncrement } from 'sequelize-typescript';
import { Books } from './books.js'
@Table({ timestamps: false ,tableName:'directories'})
export class Directory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({unique:true})
  dirName!: string;

  @Column
  status!: boolean; 

  @HasMany(() => Books)
  books!: Books[];

}