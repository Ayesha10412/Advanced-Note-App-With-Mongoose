import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInterfacesMethods,
  UserStaticMethods,
} from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import { Note } from "./note.models";
const addressSchema = new Schema<IAddress>(
  {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zip: {
      type: Number,
    },
  },
  { _id: false }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInterfacesMethods>(
  {
    firstName: {
      type: String,
      required: [true, "First name is require"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email must be unique!"],
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: function (props) {
          return `Email ${props.value} is not valid email.`;
        },
      },
    },
    password: {
      type: String,
      required: [true, "password is required!"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role is not valid! Got {VALUE} role.",
      },
      default: "user",
    },
    address: { type: addressSchema },
  },
  { versionKey: false, timestamps: true }
);
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.pre("find", function (next) {
  next();
});
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    console.log(`${doc} is find`);
    await Note.deleteMany({ user: doc._id });
  }
  next();
});
userSchema.post("save", function (doc, next) {
  console.log(`${doc.email} has been saved!`);
  next();
});
export const User = model<IUser, UserStaticMethods>("User", userSchema);
