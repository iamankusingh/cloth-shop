import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(uid);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
  }
};
