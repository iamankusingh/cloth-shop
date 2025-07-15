import { Router } from "express";
import { updateUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", updateUser)

export default userRouter;
