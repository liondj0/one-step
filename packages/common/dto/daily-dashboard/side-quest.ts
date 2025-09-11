import {z} from "zod";


export type SideQuest = {
  label: string;
  completedAt: Date;
};

export const sideQuestSchema = z.object({
  label: z.string(),
  completedAt: z.date(),
});
