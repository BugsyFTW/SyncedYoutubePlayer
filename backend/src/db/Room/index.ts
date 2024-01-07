import { Schema, model } from "mongoose";

//Interfaces
interface IRoom {
  uid: string;
  video: string;
  created: Date;
}

//Schema
const RoomSchema = new Schema<IRoom>({
  uid: { type: String, required: true, unique: true },
  video: { type: String, required: false },
  created: { type: Date, required: true },
});

//Model
export const RoomModel = model<IRoom>('Rooms', RoomSchema);