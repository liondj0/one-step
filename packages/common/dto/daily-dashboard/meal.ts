import {z} from "zod";


export type Meal = {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  ateAt?: Date;
};


export const mealSchema = z.object({
  type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  ateAt: z.date(),
});
