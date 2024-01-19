import { Server as SocketServer, Socket } from "socket.io";

import { ON_USER_CONNECTION } from "@config/constants";

export default (io: SocketServer, socket: Socket): void => {

   socket.on(ON_USER_CONNECTION, (uid) => {

      //const user = socket.id;
      socket.join(uid);
      //socket.join(user);

      // -> Get all rooms = io.sockets.adapter.rooms
   });

}