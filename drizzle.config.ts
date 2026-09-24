import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './libs/database/src/schema',
  out: './drizzle/migratioins',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
