import { Emoji } from "../../enums/emoji";

export type Reaction = {
  id: string;
  emoji: Emoji;
  userId: string;
};
