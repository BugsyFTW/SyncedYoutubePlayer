import { Router } from 'express';

import { USER_PATH } from "@config/constants";
import { getAllUsers } from "@controllers/users";

import { isAuthenticated } from "@middlewares";

export default (router: Router) => {
  // Setup routes
  router.get(`${USER_PATH}`, isAuthenticated, getAllUsers);
};