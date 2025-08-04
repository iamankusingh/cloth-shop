import express, { Request, Response } from "express";
import cors from "cors";
import connectToDatabase from "./database/mongodb";
import userRouter from "./routes/userRoute";
import clothConfigRouter from "./routes/clothConfigRoute";
import adminRouter from "./routes/adminRouter";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cloth-config", clothConfigRouter);
app.use("/api/v1/admin", adminRouter);

// default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "welcome to 3D cloth shop",
  });
});

// server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  await connectToDatabase();
});
