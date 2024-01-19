import axios from "axios";

export const createRoom = async () => {
  const response = await axios.post('http://localhost:3000/room');
  return response.data;
};

export const getRoom = async (uid: string) => {
  const response = await axios.get(`http://localhost:3000/room/${uid}`);
  return response.data;
}