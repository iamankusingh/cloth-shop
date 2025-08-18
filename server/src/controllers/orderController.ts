import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderModel from "../models/orderModel";

export const orderCloth = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // uid from clerk
    const uid = req.query.uid as string;

    // get cloth config data from client
    console.log("Order config data from client ", req.body);

    // create cloth config order
    console.log("Creating order file with uid", uid, "and with data", req.body);

    // creating config
    const newOrderhConfig = await OrderModel.create(
      [
        {
          uid,
          ...req.body,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // api status code and response
    if (newOrderhConfig) {
      res.status(201).json({
        success: true,
        message: "Order placed",
      });
      console.log("New order", newOrderhConfig);
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to place order",
      });
      console.log("Failed to receive order");
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
