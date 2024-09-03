import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  dialect: 'postgresql',
  migrations: {
    prefix: 'unix'
  },
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  // Print all statements
  verbose: !!(process.env.DB_VERBOSE && true),
  // Always ask for confirmation
  strict: !!(process.env.DB_STRICT && true),
});
