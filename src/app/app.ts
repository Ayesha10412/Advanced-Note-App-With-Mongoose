import express, { Application, Request, Response } from "express";
import { noteRoutes } from "./controller/note.controller";
import { userRoutes } from "./controller/user.controller";
const app: Application = express();
app.use(express.json());
app.use("/notes", noteRoutes);
app.use("/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App!");
});
export default app;
//MVC-- Model, View, Controller
