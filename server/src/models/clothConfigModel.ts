import mongoose from "mongoose";

interface clothConfigInterface {
  uid: string;
  hexColor: string;
  logoImg?: string;
  logoPath?: string;
  imageSize?: number;
  positionY?: number;
  clothText?: string;
  designImg?: string;
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
  logoImg: {
    type: String,
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
  designImg: {
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
