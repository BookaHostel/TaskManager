import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import User from "../models/userModel";

import { HttpStatusCodes } from "../utils/status-codes";

export const listAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error: any) {
    console.error("request failed", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error?.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userId = uuidv4();

    const newUser = new User({
      id: userId,
      ...req.body,
    });

    const createdUser = await newUser.save();

    res.status(HttpStatusCodes.CREATED).json(createdUser);
  } catch (error: any) {
    console.error(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error?.message });
  }
};
