import express, { Request, Response } from "express";
import cors from "cors";
import connectToDatabase from "./database/mongodb";
import userRouter from "./routes/userRoute";
import clothConfigRouter from "./routes/clothConfigRoute";
import adminRouter from "./routes/adminRoute";
import orderRouter from "./routes/orderRoute";
import { host, port } from "./config/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cloth-config", clothConfigRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/order", orderRouter);

// default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "welcome to 3D cloth shop",
  });
});

// server
app.listen(port, host, async () => {
  console.log(`Server is running on http://${host}:${port}`);

  await connectToDatabase();
});
