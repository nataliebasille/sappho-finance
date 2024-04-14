import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "~/server/db";

export async function main() {
  await migrate(db, { migrationsFolder: "./migrations" });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
