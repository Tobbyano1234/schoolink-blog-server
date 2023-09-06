

import mongoose, { ConnectOptions } from 'mongoose';

// config should be imported before importing any other file
import { config } from '../env';
import { LiveDBConnectOptions, MockDBConnectOptions } from './connect.options';
import logger from '../utils/logger';


export const LiveDatabaseManager = (connectionURI: string, options: ConnectOptions, func: () => void) => {
    return function init() {
        mongoose
            .connect(connectionURI, options)
            .then(() => {
                logger.info(
                    'Live MongoDB Database connected.'
                );
                func();
            })
            .catch((err: any) => {
                logger.error(
                    'Live MongoDB connection error. Please make sure MongoDB is running.\n' + err
                );
                process.exit(1);
            });

        const db = mongoose.connection;

        db.on('error', (err: any) => {
            logger.error(
                'MongoDB error:\n' + err
            );
        });

        // // print mongoose logs in dev env
        // if (config.store.database.mongodb.mongooseDebug) {
        //     mongoose.set(
        //         'debug',
        //         (collectionName: String, method: String, query: String, doc: Document) => {
        //             debug('perday-server:index')(
        //                 `${collectionName}.${method}`,
        //                 util.inspect(query, false, 20),
        //                 doc,
        //             );
        //         }
        //     );
        // }
    }
};


/**
 * Connect to the test database.
 */
export const MockDatabaseManager = (uri: string, mongooseOpts: ConnectOptions = {}) => {
    /**
     * @ATTENTION @CAUTION Operations on live server will delete the entire database.
     */
    if (uri === config.store.database.mongodb.uri) {
        throw new Error('Attempt to use LIVE_DATABASE for testing');
    }
    return {
        setup: async () => {
            try {
                const connectOptions = mongooseOpts || MockDBConnectOptions;
                const dbConnection = await mongoose.connect(uri, connectOptions);
                dbConnection && console.info(
                    'Test MongoDB Database connected.'
                );
            } catch (error: any) {
                console.error(
                    'Test MongoDB connection error. Please make sure MongoDB is running.\n' + error
                );
                process.exit(1);
            }
        },
        close: async () => {
            await mongoose.connection.close();
        },
        clear: async () => {
            const collections = mongoose.connection.collections;

            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            };
        },
    };
};

export const startDB = () => {
    let connectionString;
    return {
        'test': () => {
            connectionString = config.store.database.mongodb.testUri;
            return MockDatabaseManager(connectionString);
        },
        'live': (func: () => void) => {
            connectionString = config.store.database.mongodb.uri;
            return LiveDatabaseManager(connectionString, LiveDBConnectOptions, func)();
        }
    };
};
