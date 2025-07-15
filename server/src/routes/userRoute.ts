import { Router } from "express";
import { handleUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", handleUser);

export default userRouter;
