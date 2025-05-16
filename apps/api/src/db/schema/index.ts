import {check, pgEnum, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";


export const baseSchema = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
}

export const authTypeEnum = pgEnum("auth_type", ["oauth", "password"]);

export const users =  pgTable("user", {
  ...baseSchema,
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  profileUrl: text("profile_url"),
  authType: authTypeEnum("auth_type").notNull(),
  password: text("password")
}, (table) => [
  check("auth_type_check", sql`${table.password} IS NOT NULL OR ${table.authType} = 'oauth'`)
])
