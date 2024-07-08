import mongoose, { Model } from "mongoose";

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
        thumbnail: { type: String },
      },
    ],
    userid: { type: String, required: true },
    public: { type: Boolean, required: true },
    ownerDetails: {
      bio: { type: String },
      title: { type: String },
      profilePic: { type: String },
      picType: { type: String },
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
