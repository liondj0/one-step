import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional().default(""),
  isPublic: z.boolean().optional(),
});

export type CreateGroupDto = {
  name: string;
  description?: string;
  isPublic?: boolean;
};
