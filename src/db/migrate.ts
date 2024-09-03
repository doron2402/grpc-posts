import { config } from 'dotenv';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';


config({ path: '.env.local' });

async function main() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL!,
  });
  const db : NodePgDatabase = drizzle(pool);

  console.log('Migrating database...');

  await migrate(db, {
    migrationsFolder: './src/db/migrations',
  });

  console.log('Database migrated successfully');

  await pool.end();
}

main();

