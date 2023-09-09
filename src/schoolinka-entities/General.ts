import { Table, Model, Column, Index, DataType, HasMany } from 'sequelize-typescript';

import { ModelNames } from "./models.names";

export type GeneralAttributes = {
  collectionName: ModelNames;
  collectionID: string;
  associatedData: { [key:string]: any };
  isValid: boolean;
}

@Table({tableName:'general', timestamps:true})
export class General extends Model<GeneralAttributes>{
  @Index
  @Column({})
    collectionName!: string;

    collectionID!: string;
    associatedData: Object;
    isValid: { type: Boolean, default: true },
 }

