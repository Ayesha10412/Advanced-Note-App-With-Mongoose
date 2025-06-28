import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import { z } from "zod";
export const userRoutes = express.Router();
import bcrypt from "bcryptjs";

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number(),
  }),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const body = await CreateUserZodSchema.parseAsync(req.body);
    // console.log(body, "Zod Body");
    const body = req.body;

    //build in and custom instance methods
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // await user.save();

    //built in and static methods
    // const password = await User.hashPassword(body.password);
    // body.password = password;
    const user = await User.create(body);

    res
      .status(201)
      .json({ success: true, message: "User created Successfully", user });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message, error });
  }
});
userRoutes.get("/", async (req: Request, res: Response) => {
  //   const userEmail = req.query.email ? req.query.email : "";
  //   const user = await User.find();
  let users = [];
  //filtering

  //   if (userEmail) {
  //     users = await User.find({ email: userEmail });
  //   } else {
  //     users = await User.find();
  //   }

  //sorting
  //   users = await User.find().sort({ email: "asc" });

  //skipping
  //   users = await User.find().skip(7);

  //limiting
  users = await User.find().limit(2);

  res
    .status(201)
    .json({ success: true, message: "User created Successfully", users });
});
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.find({ _id: userId });
  res.status(201).json({
    success: true,
    message: "User created Successfully",
    user,
  });
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
  const user = await User.findOneAndDelete({ _id: userId });
  res
    .status(201)
    .json({ success: true, message: "User created Successfully", user });
});
