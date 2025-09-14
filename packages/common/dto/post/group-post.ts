import { z } from "zod";
import { User, userSchema } from "../../types/models/user";
import {ReactionsGroup} from "../reactions/reactions-group";

export type GroupPost = {
  id: string;
  message: string;
  user: User;
  createdAt: Date;
  reactionsGroup: ReactionsGroup
};

export const groupPostSchema = z.object({
  message: z.string().min(10),
  user: userSchema,
  createdAt: z.date(),
});
