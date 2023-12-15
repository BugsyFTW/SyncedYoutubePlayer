import { Router } from "express";

import { AUTH_PATH } from "@config/constants";
import { register, login } from "@controllers/authentication";

export default (router: Router) => {
    router.post(`${AUTH_PATH}/register`, register);
    router.post(`${AUTH_PATH}/login`, login);
}