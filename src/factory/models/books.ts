import { Table, Column, Model, BelongsTo, ForeignKey, PrimaryKey,AutoIncrement } from 'sequelize-typescript';

import { Directory } from './directory.js'

@Table({ timestamps: false, tableName: 'books' })

export class Books extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    bookName!: string;

    @Column({ unique: true })
    slug!: string;

    @ForeignKey(() => Directory,)
    @Column
    directoryId!: number;

    @BelongsTo(() => Directory)
    dirId!: Directory;
}

