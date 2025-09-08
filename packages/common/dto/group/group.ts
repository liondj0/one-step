import { z } from "zod";

export const groupSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional().default(""),
  isPublic: z.boolean().optional().default(false),
  usersCount: z.number().positive().optional().default(0),
});

export type Group = z.infer<typeof groupSchema>;
