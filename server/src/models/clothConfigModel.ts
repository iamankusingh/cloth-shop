import mongoose from "mongoose";

interface clothConfigInterface {
  uid: string;
  hexColor: string;
  logoPath?: string;
  imageSize?: number;
  positionY?: number;
  clothText?: string;
  designImgPath?: string;
  designScale?: number;
}

const clothConfigSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: [true, "User ID is required"],
    unique: true,
  },
  hexColor: {
    type: String,
    required: [true, "Color is required"],
  },
  logoPath: {
    type: String,
  },
  imageSize: {
    type: Number,
  },
  positionY: {
    type: Number,
  },
  clothText: {
    type: String,
  },
  designImgPath: {
    type: String,
  },
  designScale: {
    type: Number,
  },
});

const ClothConfigModel = mongoose.model<clothConfigInterface>(
  "ClothConfig",
  clothConfigSchema
);

export default ClothConfigModel;
