import { Router } from "express";
import { getAllOrders, getAllUsers, isAdmin } from "../controllers/adminController";
import { adminAuth } from "../middlewares/authMiddleware";

const adminRouter = Router();

adminRouter.get("/", adminAuth, isAdmin);
adminRouter.get("/getAllUsers", adminAuth, getAllUsers);
adminRouter.get("/getAllOrders", adminAuth, getAllOrders);

export default adminRouter;
