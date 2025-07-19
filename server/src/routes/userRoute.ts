import { Router } from "express";
import {
  fetchUserData,
  handleUser,
  clothConfig,
  fetchClothConfig,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/data", fetchUserData);
userRouter.post("/", handleUser);
userRouter.post("/cloth-config", clothConfig);
userRouter.post("/fetch-cloth-config", fetchClothConfig);

export default userRouter;
