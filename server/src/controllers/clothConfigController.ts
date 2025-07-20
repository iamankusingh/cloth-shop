import { Request, Response } from "express";
import mongoose from "mongoose";
import ClothConfigModel from "../models/clothConfigModel";

export const fetchClothConfig = async (req: Request, res: Response) => {
  try {
    // uid from clerk
    const uid = req.query.uid as string;

    console.log("Fetching cloth config for UID:", uid);

    const clothConfigData = await ClothConfigModel.findOne({ uid });

    if (clothConfigData) {
      res.status(200).json({
        success: true,
        message: "Fetch cloth config data",
        // return detched cloth config data
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const handleClothConfig = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // uid from clerk
    const uid = req.query.uid as string;

    console.log("cloth config data from client ", req.body);

    // get cloth config data
    const {
      hexColor,
      logoImg,
      logoPath,
      imageSize,
      positionY,
      clothText,
      designImg,
      designImgPath,
      designScale,
    } = req.body;

    // create cloth config if doesn't exists else just modify
    const existingClothConfig = await ClothConfigModel.findOne({ uid });

    if (!existingClothConfig) {
      console.log("cloth config doesn't exists, creating...");

      // creating config
      const newClothConfig = await ClothConfigModel.create(
        [
          {
            uid,
            hexColor,
            logoImg,
            logoPath,
            imageSize,
            positionY,
            clothText,
            designImg,
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
      // uid from clerk
      const uid = req.query.uid as string;

      // if exists then just update
      console.log("Cloth config already exists, updating with uid", uid);

      // update cloth config
      const updateClothConfig = await ClothConfigModel.findOneAndUpdate(
        { uid: uid },
        {
          uid,
          hexColor,
          logoImg,
          logoPath,
          positionY,
          imageSize,
          clothText,
          designImg,
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
};
