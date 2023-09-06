// // socketServer.ts
// import { Server as SocketIo, ServerOptions } from "socket.io";
// // import { httpServer } from ''; // Import the HTTP server instance
// import { Server, config } from "../config";
// import createServer from "./app";

// const ioServerOptions: Partial<ServerOptions> = {
//     cors: {
//         origin: config.frontendAppUrl,
//         credentials: true
//     }
// };

// const app = createServer()

// const port = config.port;

// // Create a Socket.IO instance and attach it to the HTTP server
// export const io = new SocketIo(Server(app,port)["live"](), ioServerOptions);

// io.on('connection', (socket) => {
//     console.log('A user connected', socket);

//     // Handle custom events
//     socket.on('custom-event', (data) => {
//         console.log('Received custom event:', data);
//         // Broadcast the event to all connected clients
//         io.emit('custom-event', data);
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

// import { Socket } from "socket.io";
// export class SocketHandler {
//     static async connectionHandler(socket: Socket) {
//         socket.on('connection', (socket) => {
//             console.log('A user connected', socket);

//             // Handle custom events
//             socket.emit('custom-event', (data: any) => {
//                 console.log('Received custom event:', data);
//                 // Broadcast the event to all connected clients
//                 socket.emit('custom-event', data);
//             });
//         })
        
        

//         socket.on('disconnecting', () => {
//             (async () => {
//                 console.log("disconnected");
//             })();

//         });
//     }
// }