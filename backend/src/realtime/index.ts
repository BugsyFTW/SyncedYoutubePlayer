import { Server } from "http";
import { Socket, Server as SocketServer } from "socket.io";

import variables from "@config/variables";
import initLobby from "@realtime/lobby";
import { ON_OWNER_VIDEO_CHANGED, ON_USER_CONNECTION, ON_VIDEO_CHANGED } from "@/config/constants";

export type SocketMessage = {
  roomId: string;
  msg: string;
}

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

    socket.on(ON_USER_CONNECTION, (uid) => {
      socket.join(uid);
      // -> Get all rooms = io.sockets.adapter.rooms
    });

    socket.on(ON_OWNER_VIDEO_CHANGED, (data: SocketMessage) => {
      socket.to(data.roomId).emit(ON_VIDEO_CHANGED, data.msg);
    });

  });
  return io;
}