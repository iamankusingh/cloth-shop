import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/userModel";

export const handleUser = async (req: Request, res: Response) => {
  try {
    // const { uid } = req.body;
    console.log(req.body);

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
        res.status(201).json({
          success: true,
          message: "User created",
          data: {
            user: newUser[0],
          },
        });
      } else {
        // if exists then just update
        console.log("User already exists, updating...");

        // update user

        // api status code and response
        res.status(201).json({
          success: true,
          message: "User updated",
        });
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
