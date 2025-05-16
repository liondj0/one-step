import { defineConfig } from 'drizzle-kit';
import config from "./src/util/config";

const { schema, ...database } = config.database;
export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        ...database,
        ssl: false,
    },
});
