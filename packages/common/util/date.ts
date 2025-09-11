import { addDays, format } from "date-fns";

export const dateUtil = {
  addDays: (date: Date, days: number) => {
    return addDays(date, days);
  },
  format: (date: Date, dateFormat: string) => {
    return format(date, dateFormat);
  },
};
