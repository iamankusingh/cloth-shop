import { Router } from "express";
import { orderCloth } from "../controllers/orderController";

const orderRouter = Router();

orderRouter.post("/", orderCloth);

export default orderRouter;
