import { addDays } from "date-fns";

export const dateUtil = {
  addDays: (date: Date, days: number) => {
    return addDays(date, days);
  },
};
