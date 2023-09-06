import { SocketHandler } from '../../famwork-push-server/services/push.server';
import { config, Server, startDB } from '../config';
import createServer from './app';
import { Server as SocketIO, ServerOptions } from 'socket.io';

const app = createServer();

const port = config.port;

let pushServer: SocketIO; // pushServer doesn't have a value
export const startServer = () => {
    const server = Server(app, port);
    if (config.env === 'test') {
        /**
         * Mock servers may be called at test point
         */
        return server.test();
    }
    const dbManager = startDB();
    dbManager.live(
        () => {
            // bootstrapProject(process.argv.slice(2));
            pushServer = new SocketIO(MainServer.httpServer, MainServer.ioServerOptions);
            // console.log(pushServer);

            // pushServer.use(SocketHandler.authTokenMiddleware);
            // pushServer.use(SocketHandler.authIdentityMiddleware);

            pushServer.on('connection', SocketHandler.connectionHandler);

        }
    );
    return server.live();
};

// export default startServer();

export const MainServer = {
    httpServer: startServer(),
    ioServerOptions: {
        cors: {
            origin: config.frontendAppUrl,
            credentials: true
        }
    } as Partial<ServerOptions>
};

// concurrency
// callback 