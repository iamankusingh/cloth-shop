import { config } from "dotenv";

config({ path: ".env" });

const DB_URL: string = process.env.DB_URL || "";
const ADMIN_ID: string = process.env.ADMIN_ID || "";

export { DB_URL, ADMIN_ID };
