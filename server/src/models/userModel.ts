// user schema for database
import mongoose from "mongoose";

interface userSchemaInterface {
  uid: string;
  fullName: string;
  email: string;
  houseNo: string;
  locality: string;
  city: string;
  pincode: number;
  districe: string;
}

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    houseNo: {
      type: String,
      trim: true,
      required: [true, "House No is required"],
    },
    locality: {
      type: String,
      trim: true,
      required: [true, "Locality is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
    },
    pincode: {
      type: Number,
      trim: true,
      required: [true, "Pincode is required"],
    },
    district: {
      type: String,
      trim: true,
      required: [true, "District is required"],
    },
    phoneNo: {
      type: Number,
      trim: true,
      required: [true, "Pincode is required"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<userSchemaInterface>("ClothUsers", userSchema);

export default UserModel;
