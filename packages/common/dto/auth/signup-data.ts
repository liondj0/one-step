import { z } from "zod";

export const signupDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export type SignupData = z.infer<typeof signupDataSchema>;
