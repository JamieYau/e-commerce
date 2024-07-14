import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

// Load environment variables from .env.local file or .env if it doesn't exist
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();  // Fallback to .env if .env.local is not found

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
