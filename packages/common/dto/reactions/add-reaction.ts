import {Emoji} from "../../enums/emoji";
import {z} from "zod";


export type AddReactionDto = {
  emoji: Emoji;
  reactionGroupId: string;
}

export const addReactionDtoSchema = z.object({
  emoji: z.enum(Object.values(Emoji)),
  reactionGroupId: z.uuid(),
})
