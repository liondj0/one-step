import {z} from "zod";


const config = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.string(),
  DATABASE_DB: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_SCHEMA: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
}).transform(obj => ({
  port: obj.PORT,
  env: obj.NODE_ENV,
  database: {
    database: obj.DATABASE_DB,
    host: obj.DATABASE_HOST,
    port: obj.DATABASE_PORT,
    user: obj.DATABASE_USERNAME,
    password: obj.DATABASE_PASSWORD,
    schema: obj.DATABASE_SCHEMA
  }
}))


console.log(config.parse(process.env))


export default config.parse(process.env)
