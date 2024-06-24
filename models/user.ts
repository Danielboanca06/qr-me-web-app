import mongoose, { Model } from "mongoose";

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
    qrCodes: [
      {
        _id: { type: String, required: true },
        accessId: { type: String, required: true },
        title: { type: String, required: true },
        previewImage: { type: String, default: null },
        public: { type: Boolean, required: true, default: true },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const UserModel: Model<User> =
  mongoose.models?.User || mongoose.model<User>("User", userSchema);

export default UserModel;
