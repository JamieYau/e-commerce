import "dotenv/config";
import { migrate } from "drizzle-orm/neon-http/migrator";
import db from "./db";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migrations complete");
}

runMigrations().catch(console.error);
