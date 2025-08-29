import {z} from "zod";


const readValue = <ReturnType>(varName: string, schema: z.Schema<ReturnType>): ReturnType => schema.parse(process.env[varName]);
const readNumber = <ReturnType>(varName: string, schema: z.Schema<ReturnType>): ReturnType => {
  return readValue(varName, z.preprocess(Number, schema)) as ReturnType;
}

export const env = Object.freeze({
  port: readNumber('PORT', z.number().int().min(1).max(65535)),
  environment: readValue('NODE_ENV', z.enum(['development', 'production', 'test'])),
  database: {
    name: readValue('DATABASE_DB', z.string()),
    host: readValue('DATABASE_HOST', z.string()),
    port: readNumber('DATABASE_PORT', z.number().int().min(1).max(65535)),
    username: readValue('DATABASE_USERNAME', z.string()),
    password: readValue('DATABASE_PASSWORD', z.string()),
    schema: readValue('DATABASE_SCHEMA', z.string()),
  },
  token: {
    secret: readValue('TOKEN_SECRET', z.string()),
  }
})
