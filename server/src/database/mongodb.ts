import mongoose from "mongoose";
import { DB_URL } from "../config/env";

if (!DB_URL) {
    throw new Error("DB_URL is not defined");
}

// connect to database
const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to Database.");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to database:", error.message);
        } else {
            console.error("Unknown error connecting to database:", error);
        }
        process.exit(1);
    }
};

export default connectToDatabase;
