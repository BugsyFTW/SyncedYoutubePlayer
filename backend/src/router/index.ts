import { Router } from 'express';

import authentication from "@router/authentication";
import users from "@router/users";

const router = Router();

export default (): Router => {

    authentication(router);
    users(router);

    return router;
}