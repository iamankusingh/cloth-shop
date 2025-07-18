import { Router } from "express";
import {
  fetchUserData,
  handleUser,
  clothConfig,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/data", fetchUserData);
userRouter.post("/", handleUser);
userRouter.post("/cloth-config", clothConfig);

export default userRouter;
