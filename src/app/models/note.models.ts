import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: String,
    content: String,
  },
  { versionKey: false, timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
const userSchema = new Schema(
  {
    name: String,
    email: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);
export const userNote = mongoose.model("userNote", userSchema);
const appSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "Green" },
    },
  },
  { versionKey: false, timestamps: true }
);
export const appNoteSchema = mongoose.model("appNoteSchema", appSchema);
