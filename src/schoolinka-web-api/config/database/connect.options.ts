import { SequelizeOptions } from 'sequelize-typescript';

import {config} from '../env'

export const LiveDBConnectOptions: SequelizeOptions = {
    dialect: 'postgres', 
    port: config.store.database.postgres.port, 
    username: config.store.database.postgres.userName,
    password: config.store.database.postgres.password,
    database: config.store.database.postgres.database,
    logging: true,
};

export const MockDBConnectOptions: SequelizeOptions = {
    dialect: 'sqlite', // Use SQLite for a mock database
    storage: ':memory:', // Use in-memory storage for the mock database
    logging: false, 
};
