import { z } from "zod";
import { mealSchema } from "./meal";
import { sideQuestSchema } from "./side-quest";

export const updateDailyActivitySchema = z.object({
  dailyGoal: z.string().optional(),
  dailyGoalCompleted: z.boolean().optional(),
  meals: z.array(mealSchema).optional(),
  sideQuests: z.array(sideQuestSchema).optional(),
});

export type UpdateDailyActivity = z.infer<typeof updateDailyActivitySchema>;
