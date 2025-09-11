import {z} from "zod";
import {mealSchema} from "./meal";
import {sideQuestSchema} from "./side-quest";


export const updateDailyActivitySchema = z.object({
  dailyGoal: z.string().optional(),
  dailyGoalCompleted: z.boolean().default(false),
  meals: z.array(mealSchema).optional(),
  sideQuests: z.array(sideQuestSchema).optional()
}).refine(
  (data) => !data.dailyGoalCompleted || !!data.dailyGoal,
  { message: "Must provide a daily goal if completed" }
)
