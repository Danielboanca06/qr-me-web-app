import mongoose, { Model, Schema } from "mongoose";
import { User } from "types";

const userSchema = new mongoose.Schema<User>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shoppingPreference: { type: String },
    phoneNumber: { type: String, unique: true, sparse: true },
    address: { type: String },
    postalCode: { type: String },
    emailToken: { type: String },
    profilePic: {
      fileName: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

const UserModel: Model<User> =
  mongoose.models?.User || mongoose.model<User>("User", userSchema);

export default UserModel;
