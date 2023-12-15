import { NextFunction, Request, Response } from "express";
import { merge, get } from "lodash";

import variables from "@config/variables";
import { getUserBySessionToken } from "@/db/User/actions";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const sessionToken = req.cookies[variables.getCookieName()];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.sendStatus(400);
    }

    merge(req, { identity: user });

    return next();
  } catch (error) {
    console.error(error);
    return res.status(400);
  }
};

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const currentUserId = get(req, 'identity._id');

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId !== id) {
      return res.sendStatus(400);
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(400);
  }
}