import { Sequelize } from 'sequelize-typescript';

// config should be imported before importing any other file
import { config } from '../env';
import { LiveDBConnectOptions, MockDBConnectOptions } from './connect.options';
import logger from '../utils/logger';
import { User } from '../../../schoolinka-entities';
import { Post } from '../../../schoolinka-entities/Post';


export const LiveDatabaseManager = (connectionURI: string, options: any, func: () => void) => {

    return function init() {
        const sequelize = new Sequelize(connectionURI, options);
        
        sequelize
            .authenticate()
            .then(() => {
                logger.info(
                    'Live PostgreSQL Database connected.'
                );
                sequelize.addModels([User, Post]);
                sequelize.sync().then(() => {
                    func();
                }).catch((err: any) => {
                    logger.error('Error occurred during table creation.\n' + err);
                    process.exit(1);
                });
            })
            .catch((err: any) => {
                logger.error(
                    'Live PostgreSQL connection error. Please make sure PostgreSQL is running.\n' + err
                );
                process.exit(1);
            });
    }
};


/**
 * Connect to the test database.
 */
export const MockDatabaseManager = (dialect: string, sequelizeOpts: any = {}) => {
    let dbConnection: Sequelize;
    
    if (dialect === config.store.database.postgres.dialect) {
        throw new Error('Attempt to use LIVE_DATABASE for testing');
    }
    return {
        setup: async () => {
            try {
                const connectOptions = sequelizeOpts || MockDBConnectOptions; 
                dbConnection = new Sequelize(connectOptions);
                dbConnection && console.info(
                    'Test Postgres Database connected.'
                );
            } catch (error: any) {
                console.error(
                    'Test Postgres connection error. Please make sure postgres server is running.\n' + error
                );
                process.exit(1);
            }
        },
        close: async () => { 
             if (dbConnection) {
            await dbConnection.close();
            console.info('Test Postgres Database connection closed.');
        }
        },
        clear: async () => {
            if (dbConnection) {
                const models = dbConnection.models;
                for (const model in models) {
                    await models[model].destroy({ where: {} });
                }
                console.info('Test Postgres Database data cleared.');
            }
        },
    };
};

export const startDB = () => {
    let connectionString;
    return {
        'test': () => {
            connectionString = config.store.database.postgres.dialect;
            return MockDatabaseManager(connectionString);
        },
        'live': (func: () => void) => {
            connectionString = config.store.database.postgres.databaseUrl;
            return LiveDatabaseManager(connectionString, LiveDBConnectOptions, func)();
        }
    };
};
