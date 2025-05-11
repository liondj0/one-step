import { defineConfig } from 'drizzle-kit';
import config from "./src/util/config";

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    schemaFilter: config.database.schema,
    dbCredentials: {
        ...config.database,
    },
});
