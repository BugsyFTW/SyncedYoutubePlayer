import { Server } from "http";
import { Socket, Server as SocketServer } from "socket.io";

import variables from "@config/variables";
import initLobby from "@realtime/lobby";

export default (server: Server): SocketServer => {
  const io = new SocketServer(server, {
    cors: {
      origin: variables.getOrigin(),
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Centralized 'connection' event handler
  io.on('connection', (socket: Socket) => {

    console.log(`User connected with ID: ${socket.id}`);
    //console.log(Object.keys(io.sockets.sockets));

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected with ID: ${socket.id} #Reason: ${reason}`);
    });

    initLobby(io, socket);

  });
  return io;
}