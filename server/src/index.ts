import express, { Request, Response } from "express";
import cors from "cors";
import connectToDatabase from "./database/mongodb";
import userRouter from "./routes/userRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);

// default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "welcome to 3D cloth shop",
  });
});

app.listen(3000, async () => {
  console.log("Server is running on http://localhost:3000");

  await connectToDatabase();
});
