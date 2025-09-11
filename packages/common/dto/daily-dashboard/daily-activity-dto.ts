import {z} from "zod";
import {mealSchema} from "./meal";
import {sideQuestSchema} from "./side-quest";


export const dailyActivityDtoSchema = z.object({
  date: z.date(),
  dailyGoal: z.string().optional(),
  dailyGoalCompleted: z.boolean().default(false),
  meals: z.array(mealSchema),
  sideQuests: z.array(sideQuestSchema)
});

export const dailyActivitiesSchema = z.array(dailyActivityDtoSchema);
