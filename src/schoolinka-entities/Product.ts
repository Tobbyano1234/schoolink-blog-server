import { Optional } from "sequelize";
import { Table, Model } from "sequelize-typescript";

type User = {
    firstName: string;
    lastName: string;
    email:string;
    phoneNumber:string;
    status:Account
    password:string;

}