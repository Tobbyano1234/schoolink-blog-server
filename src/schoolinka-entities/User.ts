import { Optional } from "sequelize";
import { Table, Model, CreatedAt, Column, UpdatedAt, Index, DataType } from 'sequelize-typescript';

// import { ModelNames } from "./models.names";
import { AccountStatus } from "../typings/Account.types";


export type UserAttributes = {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    avatar?: string;
    status: AccountStatus;
    isNewUser: boolean;
    isVerified: boolean;
    isDeactivatedAccount: boolean;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Index('id_index')
    @Column(DataType.UUIDV4)
    id!: string;
   
    @Column
    firstName!: string;
  
    @Column
    lastName!: string;

    @Column
    phoneNumber!: string;

    @Index('email_index')
    @Column
    email!: string;
    
    @Column
    password!: string;

    @Column
    avatar?: string;

    @Column
    status!: string;

    @Column({defaultValue: false})
    isNewUser: boolean;

    @Column({defaultValue:false})
    isVerified!: boolean;
    
    @Column({defaultValue:false})
    isDeactivatedAccount: boolean;
    
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
};