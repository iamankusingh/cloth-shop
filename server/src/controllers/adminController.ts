import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { ADMIN_ID } from "../config/env";

export const isAdmin = async (req: Request, res: Response) => {
  try {
    // uid from clerk
    const uid = req.query.uid as string;

    console.log(uid, "===", ADMIN_ID);

    if (uid === ADMIN_ID) {
      res.status(200).json({
        success: true,
        message: "Admin verified",
      });
      console.log("Admin confirmed");
    } else {
      res.status(404).json({
        success: false,
        message: "Not admin",
      });
      console.log("Not a admin");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("Sending all users data");

    const userData = await UserModel.find({});

    if (userData) {
      res.status(200).json({
        success: true,
        message: "Fetched all users data",
        // return fetched user data
        data: userData,
      });
      console.log("Fetched all users data", userData);
    } else {
      res.status(404).json({
        success: false,
        message: "None users found",
      });
      console.log("None users found");
    }
  } catch (error) {
    console.error(error);
  }
};
