import { Server } from "http";
import { Socket, Server as SocketServer } from "socket.io";

import room from "@realtime/room";

export default (server: Server): SocketServer => {
  const io = new SocketServer(server);

  // Centralized 'connection' event handler
  io.on('connection', (socket: Socket) => {

    console.log(`User connected with ID: ${socket.id}`);

    room(io, socket);

  });
  return io;
}