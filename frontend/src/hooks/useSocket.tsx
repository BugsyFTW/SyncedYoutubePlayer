import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import socket from "@lib/socket";

const useSocket = () => {

  const [instance, setInstance] = useState<Socket>(null);

  useEffect(() => {
    const newSocket = socket.connect();
    setInstance(newSocket);

    newSocket.on('connect_error', (error) => console.error(error));

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    }
  }, []);

  return instance;
};

export default useSocket;