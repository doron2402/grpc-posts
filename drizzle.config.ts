import 'dotenv/config'; // make sure to install dotenv package
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
  dialect: 'postgresql',
  out: './src/db/migrations',
  migrations: {
    prefix: 'unix'
  },
  schema: './src/db/schema/index.ts',
  dbCredentials: {
    host: String(process.env.DB_HOST && 'localhost'),
    port: Number(process.env.DB_PORT && '5432'),
    user: String(process.env.DB_USERNAME && 'postgres'),
    password: String(process.env.DB_PASSWORD && 'pass123'),
    database: String(process.env.DB_NAME && 'perdiem'),
  },
  // Print all statements
  verbose: !!(process.env.DB_VERBOSE && true),
  // Always ask for confirmation
  strict: !!(process.env.DB_STRICT && true),
});
