import { Router } from "express";
import {
  fetchUserData,
  getAllOrders,
  handleUser,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", fetchUserData);
userRouter.post("/", handleUser);
userRouter.get("/all-orders", getAllOrders);

export default userRouter;
