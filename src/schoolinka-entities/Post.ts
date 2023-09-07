import { Column, DataType, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import {  User } from ".";

export type PostAttributes = {
    userID: string;
    title: string;
    content: string;
};


@Table({ tableName: 'posts', timestamps: true })
export class Post extends Model<PostAttributes> {
    @Index
    @Column({
        primaryKey:true,
        type: DataType.UUID,
        allowNull: false
    })
    id!: string;

    @Index
    @ForeignKey(()=> User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content!: string;

}