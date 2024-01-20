import { Server } from "http";
import { Socket, Server as SocketServer } from "socket.io";

import variables from "@config/variables";
import { ON_OWNER_VIDEO_CHANGED } from "@/config/constants";
import { SocketEvent } from "@config/constants";

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
  io.on(SocketEvent.CONNECTION, (socket: Socket) => {

    console.log(`User connected with ID: ${socket.id}`);

    socket.on(SocketEvent.DISCONNECT, (reason) => console.log(`User disconnected with ID: ${socket.id} #Reason: ${reason}`));

    // -> Get all rooms = io.sockets.adapter.rooms
    socket.on(SocketEvent.USER_CONNECTION, (uid) => socket.join(uid));

    socket.on(SocketEvent.LOAD_VIDEO, (data: SocketMessage) => socket.to(data.roomId).emit(SocketEvent.LOADING_VIDEO, data.msg));

    socket.on(SocketEvent.STATE_CHANGE, (data: SocketMessage) => {
      socket.to(data.roomId).emit(SocketEvent.STATE_CHANGE, data.msg);
    });
  });
  return io;
}