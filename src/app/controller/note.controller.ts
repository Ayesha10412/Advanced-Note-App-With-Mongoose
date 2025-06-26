import express, { Request, Response } from "express";
import { appNoteSchema, Note, userNote } from "../models/note.models";
export const noteRoutes = express.Router();
noteRoutes.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongoose!",
    content: "I am learning Mongoose.",
  });
  await myNote.save();
  res
    .status(201)
    .json({
      success: true,
      message: "Note created successfully!",
      note: myNote,
    });
});

noteRoutes.post("/create-userNote", async (req: Request, res: Response) => {
  const user = new userNote({
    name: "Ayesha",
    email: "ayesha@gmail.com",
  });
  await user.save();
  res.status(201).json({
    success: true,
    message: "User note created successfully!",
    note: user,
  });
});
//enum is a field of predefined list of options
noteRoutes.post(
  "/create-advanced-note",
  async (req: Request, res: Response) => {
    //approach1
    const advancedNote = new appNoteSchema({
      title: "Learning Node",
      tags: {
        label: "database",
      },
    });
    await advancedNote.save();
    res.status(201).json({
      success: true,
      message: "Advanced note created successfully.",
      note: advancedNote,
    });
  }
);
noteRoutes.post(
  "/create-advanced-note",
  async (req: Request, res: Response) => {
    const body = req.body;
    const note = await appNoteSchema.create(body);
    res.status(201).json({
      success: true,
      message: "Advanced note created successfully.",
      note: note,
    });
  }
);
noteRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await appNoteSchema.find();
  res.status(201).json({
    success: true,
    message: "Advanced note created successfully.",
    note: notes,
  });
});

noteRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // const note= await appNoteSchema.findById(noteId)
  const note = await appNoteSchema.findOne({ _id: noteId });
  res.status(201).json({
    success: true,
    message: "Advanced note created successfully.",
    note,
  });
});

noteRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await appNoteSchema.findByIdAndUpdate(noteId, updatedBody, {
    new: true,
  });
  res.status(201).json({
    success: true,
    message: "Advanced note updated successfully.",
    note,
  });
});

noteRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await appNoteSchema.findByIdAndDelete(noteId);
  // const note1= await appNoteSchema.deleteOne({_id:noteId})
  // const note1= await appNoteSchema.findAndDelete({_id:noteId})
  res.status(201).json({
    success: true,
    message: "Advanced note updated successfully.",
    note,
  });
});
