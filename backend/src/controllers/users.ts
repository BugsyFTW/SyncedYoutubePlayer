import express, { Request, Response } from 'express';

import { getUsers } from "@/db/User/actions";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
   return res.status(400); 
  }
}