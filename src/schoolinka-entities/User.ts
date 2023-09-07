import { Table, Model, Column, Index, DataType, HasMany } from 'sequelize-typescript';

import { AccountStatus } from "../typings/Account.types";
import { Post } from './Post';

export type UserAttributes = {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    avatar?: string;
    status?: AccountStatus;
    isNewUser?: boolean;
    isVerified?: boolean;
    isDeactivatedAccount?: boolean;
};

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<UserAttributes> {
    @Index
    @Column({
        primaryKey:true,
        type: DataType.UUID,
        allowNull: false
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phoneNumber!: string;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    avatar?: string;

    @Column({
        type: DataType.ENUM,
        allowNull: true,
        values: [AccountStatus.ACTIVE,
        AccountStatus.INACTIVE,
        AccountStatus.SUSPENDED,
        AccountStatus.BANNED,]
    })
    status!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true, defaultValue: true
    })
    isNewUser: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true, defaultValue: false
    })
    isVerified!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true, defaultValue: false
    })
    isDeactivatedAccount: boolean;

    @HasMany(() => Post, 'userId')
    posts: Post[];
};
