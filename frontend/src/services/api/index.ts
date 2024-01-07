import axios from "axios";

export const createRoom = async () => {
  const response = await axios.post('http://localhost:3000/room');
  return response.data;
};