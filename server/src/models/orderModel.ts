import mongoose from "mongoose";

interface orderInterface {
  uid: string;
  hexColor: string;

  logo?: string;
  logoPath?: string;
  logoSize?: number;
  logoPositionX?: number;
  logoPositionY?: number;
  logoUrl?: string;

  clothText?: string;
  clothFont?: string;
  clothTextColor?: string;
  clothTextSize?: number;
  clothTextPositionX?: number;
  clothTextPositionY?: number;

  design?: string;
  designPath?: string;
  designScale?: number;
  clothSize?: string;
  clothFabric?: string;

  price?: number;
}

const orderSchema = new mongoose.Schema(
  {
    uid: {
      type: String, 
      required: [true, "User ID is required"],
      // unique: true, 
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
    logoPositionX: {
      type: Number,
    },
    logoPositionY: {
      type: Number,
    },
    logoUrl: {
      type: String,
    },

    clothText: {
      type: String,
    },
    clothFont: {
      type: String,
    },
    clothTextColor: {
      tyle: String,
    },
    clothTextSize: {
      tyle: Number,
    },
    clothTextPositionX: {
      tyle: Number,
    },
    clothTextPositionY: {
      tyle: Number,
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

    clothSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    clothFabric: {
      type: String,
      enum: ["Cotton", "Silk", "Polyester", "Wool", "Lenin", "Khakhi"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<orderInterface>("orders", orderSchema);

export default OrderModel;
