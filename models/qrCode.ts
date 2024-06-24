import mongoose, { Model } from "mongoose";

const qrCodeSchema = new mongoose.Schema<QrCode>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    accessId: { type: String, required: true, unique: true },
    html: { type: String },
    title: { type: String, required: true },
    previewImage: { type: String },
    owner: { type: String },
    public: { type: Boolean, required: true },
    qrCode: { type: String, required: true },
  },
  { timestamps: true }
);

const QrCodeModel: Model<QrCode> =
  mongoose.models?.QrCode || mongoose.model<QrCode>("QrCode", qrCodeSchema);

export default QrCodeModel;
