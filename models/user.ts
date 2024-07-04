import mongoose, { Model, Schema } from "mongoose";

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
    // content: {
    //   type: [
    //     {
    //       type: new Schema(
    //         {
    //           id: { type: String, required: true },
    //           title: { type: String },
    //           link: { type: String },
    //           active: { type: Boolean, required: true },
    //           layout: { type: String, required: true },
    //           thumbnail: { type: String },
    //         },
    //         { _id: false }
    //       ),
    //       required: false,
    //     },
    //     {
    //       type: new Schema(
    //         {
    //           id: { type: String, required: true },
    //           text: { type: String },
    //           active: { type: Boolean, required: true },
    //         },
    //         { _id: false }
    //       ),
    //       required: false,
    //     },
    //   ],
    //   required: false,
    // },
  },
  { timestamps: true }
);

const UserModel: Model<User> =
  mongoose.models?.User || mongoose.model<User>("User", userSchema);

export default UserModel;
