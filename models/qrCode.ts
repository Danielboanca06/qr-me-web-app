import mongoose, { Model, Schema } from "mongoose";

const qrCodeSchema = new mongoose.Schema<QrCode>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true, required: true },
    accessId: { type: String, required: true, unique: true },
    content: {
      type: [
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
      required: false,
    },

    bio: { type: String },
    previewImage: { type: String },
    owner: { type: String },
    ownerProfilePic: { type: String },
    public: { type: Boolean, required: true },
    qrCode: { type: String, required: true },
  },
  { timestamps: true }
);

const QrCodeModel: Model<QrCode> =
  mongoose.models?.QrCode || mongoose.model<QrCode>("QrCode", qrCodeSchema);

export default QrCodeModel;
