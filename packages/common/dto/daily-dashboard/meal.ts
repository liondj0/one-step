import { z } from "zod";

export type Meal = {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  ateAt?: Date;
};

export const mealSchema = z.object({
  type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  ateAt: z.iso
    .datetime()
    .transform((date) => (date ? new Date(date) : undefined))
    .optional(),
});
