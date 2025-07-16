import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/userModel";

export const handleUser = async (req: Request, res: Response) => {
  try {
    console.log("Form data from frontend : ", req.body);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // get form data
      const {
        uid,
        fullName,
        houseNo,
        locality,
        city,
        pincode,
        district,
        phoneNo,
      } = req.body;

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
    }
  } catch (error) {
    console.error(error);
  }
};
