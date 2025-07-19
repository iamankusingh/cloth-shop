import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/userModel";

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    // uid from clerk
    const uid = req.query.uid as string;
    console.log("Fetching user data for UID:", uid);

    const userData = await UserModel.findOne({ uid });

    if (userData) {
      res.status(200).json({
        success: true,
        message: "Fetch user data",
        // return fetched user data
        data: userData,
      });
      console.log("Fetched user data", userData);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      console.log("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleUser = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // uid from clerk
    const uid = req.query.uid as string;

    console.log("User data from client ", req.body);

    // get form data
    const { fullName, houseNo, locality, city, pincode, district, phoneNo } =
      req.body;

    // create user if doesn't exists else just modify
    const existingUser = await UserModel.findOne({ uid });

    if (!existingUser) {
      console.log("User doesn't exists, creating...");

      // creating user
      const newUser = await UserModel.create(
        [
          {
            uid,
            fullName,
            houseNo,
            locality,
            city,
            pincode,
            district,
            phoneNo,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      // api status code and response
      if (newUser) {
        res.status(201).json({
          success: true,
          message: "User created",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to create user",
        });
      }
    } else {
      // if exists then just update
      console.log("User already exists, updating...");

      // update user
      const updateUser = await UserModel.findOneAndUpdate(
        { uid: uid },
        {
          uid,
          fullName,
          houseNo,
          locality,
          city,
          pincode,
          district,
          phoneNo,
        }
      );

      await session.commitTransaction();
      session.endSession();

      // api status code and response
      if (updateUser) {
        res.status(201).json({
          success: true,
          message: "User updated",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to update user",
        });
      }
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
