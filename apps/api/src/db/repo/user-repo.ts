import db from "../../db/index";
import { createInsertSchema } from "drizzle-zod";
import { users } from "../schema";
import { z } from "zod";

export const insertUserSchema = createInsertSchema(users);
export type InsertUserParams = z.infer<typeof insertUserSchema>;

export const insertUser = (user: InsertUserParams) => {
  return db().insert(users).values(user).returning();
};


