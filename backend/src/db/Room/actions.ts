import { RoomModel } from "@db/Room";

export const getRooms = () => RoomModel.find();

export const getRoomByUID = (uid: string) => RoomModel.findOne({ uid });