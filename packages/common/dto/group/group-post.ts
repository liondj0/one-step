import { z } from "zod";
import { User, userSchema } from "../../types/models/user";

export type GroupPost = {
  message: string;
  user: User;
  createdAt: Date;
};

export const groupPostSchema = z.object({
  message: z.string().min(10),
  user: userSchema,
  createdAt: z.date(),
});
