import { z } from "zod";
import { mealSchema } from "./meal";
import { sideQuestSchema } from "./side-quest";

export const dailyActivityDtoSchema = z.object({
  id: z.uuid(),
  date: z.date(),
  dailyGoal: z.string().optional(),
  dailyGoalCompleted: z.boolean().default(false),
  meals: z.array(mealSchema).optional(),
  sideQuests: z.array(sideQuestSchema).optional(),
});

export const dailyActivitiesSchema = z.array(dailyActivityDtoSchema);

export type DailyActivity = z.infer<typeof dailyActivityDtoSchema>;
