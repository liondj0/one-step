import { z } from "zod";

export const createGroupPostSchema = z.object({
  message: z.string().min(10),
  groupId: z.string(),
});

export type CreateGroupPostDto = {
  message: string;
  groupId: string;
};
