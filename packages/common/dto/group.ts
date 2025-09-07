import {z} from "zod";


export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional().default(""),
  isPublic: z.boolean().optional().default(false),
})

export type CreateGroupDto = z.infer<typeof createGroupSchema>;
