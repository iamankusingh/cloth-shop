import { config } from "dotenv";

config({path: ".env"});

const DB_URL: string = process.env.DB_URL || "";

export { DB_URL };
