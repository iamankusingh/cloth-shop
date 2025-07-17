import { Router } from "express";
import { fetchUserData, handleUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/data", fetchUserData);
userRouter.post("/", handleUser);

export default userRouter;
