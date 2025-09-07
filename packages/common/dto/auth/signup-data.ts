import { z } from "zod";

export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const signupDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
