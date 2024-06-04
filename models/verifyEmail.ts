import mongoose, { Schema, model } from "mongoose";

const verifyEmailSchema = new Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1d" },
});

const VerifyEmail =
  mongoose.models.VerifyEmail || model("VerifyEmail", verifyEmailSchema);

export default VerifyEmail;
