import { Router } from "express";
import { getAllUsers, isAdmin } from "../controllers/adminController";
import { adminAuth } from "../middlewares/authMiddleware";

const adminRouter = Router();

adminRouter.get("/", adminAuth, isAdmin);
adminRouter.get("/getAllUsers", getAllUsers)

export default adminRouter;
