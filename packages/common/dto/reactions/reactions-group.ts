import {Reaction} from "./reaction";
import {Emoji} from "../../enums/emoji";


export type ReactionsGroup = {
  id: string;
  countPerEmoji?: {emoji: Emoji, count: number}[];
  reactions: Reaction[]
}
