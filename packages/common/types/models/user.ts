import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  profilePhoto: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
