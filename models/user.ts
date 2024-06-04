import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema<User>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User> =
  mongoose.models?.User || mongoose.model<User>("User", userSchema);

export default UserModel;
