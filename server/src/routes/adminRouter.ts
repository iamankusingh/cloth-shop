import { Router } from "express";
import { isAdmin } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get("/", isAdmin);

export default adminRouter;
