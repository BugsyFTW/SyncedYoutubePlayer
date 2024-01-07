import { Server as SocketServer, Socket } from "socket.io";

import { random } from "@helpers";
const lobbies: Map<string, string> = new Map();

export default (io: SocketServer, socket: Socket): void => {

   socket.on('createLobby', (socket: Socket) => {

      const user = socket.id;

      const lobbyId = random();

      lobbies.set(lobbyId, "nada");

      socket.join(lobbyId);

      // -> Get all rooms = io.sockets.adapter.rooms

   });

}