import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  userid: String,
  imageFile: Buffer,
  createdAt: { type: Date, default: Date.now },
});

// Check if model already exists to prevent recompilation
const ImageDataTypeModel =
  mongoose.models.Image || mongoose.model("Image", imageSchema);

export default ImageDataTypeModel;
