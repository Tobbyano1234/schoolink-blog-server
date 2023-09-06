import { config, Server, startDB } from '../config';
import createServer from './app';

const app = createServer()

const port = config.port;

export const startServer = async () => {
    const server = Server(app, port);
    if (config.env === 'test') {
        /**
         * Mock servers may be called at test point
         */
        return server.test();
    }
    const dbManager = startDB();
    dbManager.live(() => {
    });
    return server.live();
};

export default startServer()

