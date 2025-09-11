import {z} from "zod";


export const createGroupPostSchema = z.object({
  message: z.string().min(10),
})

export type CreateGroupPostDto = {
  message: string;
}
