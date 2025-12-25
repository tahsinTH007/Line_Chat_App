import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  // Server
  PORT: z.coerce.number().default(5000),

  // Environment
  NODE_ENV: z.string().min(1),

  // Database
  DB_HOST: z.string().min(1, "DB_HOST is required"),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
