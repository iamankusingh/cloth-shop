import express, { Request, Response } from "express";
import connectToDatabase from "./database/mongodb";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, async () => {
  console.log("Server is running on http://localhost:3000");

  await connectToDatabase();
});
