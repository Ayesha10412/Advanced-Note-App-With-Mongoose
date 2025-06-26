import express, { Request, Response } from "express";
import { User } from "../models/user.models";
export const userRoutes = express.Router();
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);
  res
    .status(201)
    .json({ success: true, message: "User created Successfully", user });
});
userRoutes.get("/", async (req: Request, res: Response) => {
  const user = await User.find();
  res
    .status(201)
    .json({ success: true, message: "User created Successfully", user });
});
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.find({ _id: userId });
  res
    .status(201)
    .json({ success: true, message: "User created Successfully", user });
});
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  res
    .status(201)
    .json({ success: true, message: "User created Successfully", user });
});
userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);
  res
    .status(201)
    .json({ success: true, message: "User created Successfully", user });
});
