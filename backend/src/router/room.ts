import { Router } from 'express';

import { ROOM_PATH } from "@config/constants";
import { createRoom, getRoom } from "@controllers/room";

export default (router: Router) => {
  router.get(`${ROOM_PATH}/:id`, getRoom);
  router.post(`${ROOM_PATH}`, createRoom);
}