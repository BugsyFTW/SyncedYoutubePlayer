import { useEffect } from "react";
import socket from "../utils/socket";

const useSocket = () => {
  useEffect(() => {
    socket.connect();
    socket.on('connect_error', (error) => console.error(error));
  }, []);
};

export default useSocket;