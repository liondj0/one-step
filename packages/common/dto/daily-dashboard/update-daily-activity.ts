import {z} from "zod";
import {mealSchema} from "./meal";
import {sideQuestSchema} from "./side-quest";


export const updateDailyActivitySchema = z.object({
  dailyGoal: z.string().optional(),
  dailyGoalCompleted: z.boolean().default(false),
  meals: z.array(mealSchema),
  sideQuests: z.array(sideQuestSchema)
}).refine(data => data.dailyGoalCompleted && !!data.dailyGoal, "Must provide a daily goal if completed");
