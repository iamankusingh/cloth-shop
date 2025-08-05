import { config } from "dotenv";

config({ path: ".env" });

const DB_URL: string = process.env.DB_URL || "";
const ADMIN_ID: string = process.env.ADMIN_ID || "";
const JWT_KEY: string = process.env.CLERK_JWT_KEY || "";

export { DB_URL, ADMIN_ID, JWT_KEY };
