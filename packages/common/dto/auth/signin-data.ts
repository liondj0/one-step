import {z} from "zod";


export const signInDataSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type SignInData = z.infer<typeof signInDataSchema>;
