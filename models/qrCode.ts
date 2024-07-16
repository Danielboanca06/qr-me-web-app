import mongoose, { Model } from "mongoose";
import { QrCode } from "types";

const qrCodeSchema = new mongoose.Schema<QrCode>(
  {
    content: [
      {
        id: { type: String, required: true },
        title: { type: String },
        link: { type: String },
        active: { type: Boolean, required: true },
        layout: { type: String },
        text: { type: String },
        thumbnail: {
          fileName: { type: String, required: false },
          url: { type: String, required: false },
        },
      },
    ],
    userid: { type: String, required: true, index: true, unique: true },
    public: { type: Boolean, required: true },
    ownerDetails: {
      bio: { type: String },
      title: { type: String },
      profilePic: {
        type: { type: String },
        fileName: { type: String },
        url: { type: String },
      },
      username: { type: String },
      firstName: { type: String },
      lastName: { type: String },
    },
    socialIcons: [
      {
        socialName: { type: String, required: true },
        url: { type: String },
        iconColor: { type: String },
      },
    ],
    background: {
      type: {
        type: String,
      },
      color: { type: String },
      gradientDirection: {
        type: String,
        enum: ["up", "down"],
      },
    },
    button: {
      type: { type: String },
      color: { type: String },
      fontColor: { type: String },
    },
    font: {
      font: { type: String },
      color: { type: String },
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const QrCodeModel: Model<QrCode> =
  mongoose.models?.QrCode || mongoose.model<QrCode>("QrCode", qrCodeSchema);

export default QrCodeModel;
