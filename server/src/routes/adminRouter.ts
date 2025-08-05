import { Router } from "express";
import { getAllUsers, isAdmin } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get("/", isAdmin);
adminRouter.get("/getAllUsers", getAllUsers)

export default adminRouter;
