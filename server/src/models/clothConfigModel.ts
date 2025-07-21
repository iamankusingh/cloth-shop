import mongoose from "mongoose";

interface clothConfigInterface {
  uid: string;
  hexColor: string;
  logo?: string;
  logoPath?: string;
  logoSize?: number;
  logoPositionY?: number;
  clothText?: string;
  design?: string;
  designPath?: string;
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
  logo: {
    type: String,
  },
  logoPath: {
    type: String,
  },
  logoSize: {
    type: Number,
  },
  logoPositionY: {
    type: Number,
  },
  clothText: {
    type: String,
  },
  design: {
    type: String,
  },
  designPath: {
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
