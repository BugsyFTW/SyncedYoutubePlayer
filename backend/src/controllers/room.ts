import { RoomModel } from '@/db/Room';
import { Request, Response } from 'express';

import { getRoomByUID } from "@db/Room/actions";

import ShortUniqueId from 'short-unique-id';

export const createRoom = async (req: Request, res: Response) => {
  try {

    const uid = new ShortUniqueId({ length: 8 }).rnd();

    const room = await new RoomModel({ uid, created: new Date() }).save();
    const roomObject = room.toObject();

    return res.status(200).json(roomObject);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {

    const uid = req.params.id;

    if (!uid) {
      return res.status(403).json({ error: "No UID given!" });
    }

    const room = await getRoomByUID(uid);
    if (!room) {
      return res.status(404).json({ error: `No Room found with the UID: ${uid}` });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};