import { Request, Response } from "express";

import User from "../models/userModel";

import { HttpStatusCodes } from "../utils/status-codes";

export const listAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error("request failed", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const newUser = new User({
      title,
      description,
      dueDate,
    });

    const createdUser = await newUser.save();

    res.status(HttpStatusCodes.CREATED).json(createdUser);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating user" });
  }
};
