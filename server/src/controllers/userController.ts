import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/userModel";
import ClothConfigModel from "../models/clothConfigModel";

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;

    const userData = await UserModel.findOne({ uid });

    if (userData) {
      res.status(200).json({
        success: true,
        message: "Fetch user data",
        data: userData,
      });
      // console.log("Fetched user data", userData);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      // console.log("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleUser = async (req: Request, res: Response) => {
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
};

export const fetchClothConfig = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;

    const clothConfigData = await ClothConfigModel.findOne({ uid });

    if (clothConfigData) {
      res.status(200).json({
        success: true,
        message: "Fetch cloth config data",
        data: clothConfigData,
      });
      console.log("Fetched cloth config data", clothConfigData);
    } else {
      res.status(404).json({
        success: false,
        message: "cloth config not found",
      });
      console.log("cloth config not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const clothConfig = async (req: Request, res: Response) => {
  try {
    console.log("cloth config data from client ", req.body);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const {
        uid,
        hexColor,
        logoPath,
        imageSize,
        positionY,
        clothText,
        designImgPath,
        designScale,
      } = req.body;

      const existingClothConfig = await ClothConfigModel.findOne({ uid });

      if (!existingClothConfig) {
        console.log("cloth config doesn't exists, creating...");

        // creating config if doesn't exist
        const newClothConfig = await ClothConfigModel.create(
          [
            {
              uid,
              hexColor,
              logoPath,
              imageSize,
              positionY,
              clothText,
              designImgPath,
              designScale,
            },
          ],
          { session }
        );

        await session.commitTransaction();
        session.endSession();

        // api status code and response
        if (newClothConfig) {
          res.status(201).json({
            success: true,
            message: "cloth config created",
          });
          console.log("Cloth config created", newClothConfig);
        } else {
          res.status(400).json({
            success: false,
            message: "Failed to create cloth config",
          });
          console.log("Failed to create cloth config");
        }
      } else {
        // if exists then just update
        console.log("Cloth config already exists, updating...");

        // update user
        const updateClothConfig = await ClothConfigModel.findOneAndUpdate(
          { uid: uid },
          {
            uid,
            hexColor,
            logoPath,
            imageSize,
            positionY,
            clothText,
            designImgPath,
            designScale,
          }
        );

        await session.commitTransaction();
        session.endSession();

        // api status code and response
        if (updateClothConfig) {
          res.status(201).json({
            success: true,
            message: "Cloth config updated",
          });
          console.log("Cloth config updated", updateClothConfig);
        } else {
          res.status(400).json({
            success: false,
            message: "Failed to update cloth config",
          });
          console.log("Failed to update cloth config");
        }
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
