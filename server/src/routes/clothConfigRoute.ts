import { Router } from "express";
import {
  fetchClothConfig,
  handleClothConfig,
} from "../controllers/clothConfigController";

const clothConfigRouter = Router();

clothConfigRouter.get("/", fetchClothConfig);
clothConfigRouter.post("/", handleClothConfig);

export default clothConfigRouter;
