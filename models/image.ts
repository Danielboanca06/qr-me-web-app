import mongoose, { Model } from "mongoose";

const ImageDataTypeSchema = new mongoose.Schema<ImageDataType>({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const ImageDataTypeModel: Model<ImageDataType> =
  mongoose.models?.ImageDataType ||
  mongoose.model<ImageDataType>("ImageDataType", ImageDataTypeSchema);

export default ImageDataTypeModel;
