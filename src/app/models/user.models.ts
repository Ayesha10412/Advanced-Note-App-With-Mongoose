import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interfaces";

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

const userSchema = new Schema<IUser>(
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
export const User = model("User", userSchema);
