import { Router } from "express";
import {
  getAllOrders,
  getAllUsers,
  isAdmin,
  updateOrderStatus,
} from "../controllers/adminController";
import { adminAuth } from "../middlewares/authMiddleware";

const adminRouter = Router();

adminRouter.get("/", adminAuth, isAdmin);
adminRouter.get("/getAllUsers", adminAuth, getAllUsers);
adminRouter.get("/getAllOrders", adminAuth, getAllOrders);
adminRouter.post("/updateOrderStatus", adminAuth, updateOrderStatus);

export default adminRouter;
