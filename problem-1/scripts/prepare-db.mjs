import "dotenv/config";
import { closeSync, mkdirSync, openSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

if (!databaseUrl.startsWith("file:")) {
  throw new Error("이 과제는 로컬 SQLite DATABASE_URL을 사용합니다.");
}

const databasePath = databaseUrl.startsWith("file://")
  ? fileURLToPath(databaseUrl)
  : resolve(databaseUrl.slice("file:".length));

// A fresh checkout needs a SQLite file before the migration engine opens it.
// Append mode creates a missing file without truncating an existing database.
mkdirSync(dirname(databasePath), { recursive: true });
closeSync(openSync(databasePath, "a"));
