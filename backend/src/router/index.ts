import { Router } from 'express';

import authentication from "@router/authentication";
import user from "@router/users";
import room from "@router/room";

const router = Router();

export default (): Router => {

    authentication(router);
    user(router);
    room(router);

    return router;
}