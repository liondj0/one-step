import { addDays, format, formatDistance } from "date-fns";

export const dateUtil = {
  addDays: (date: Date, days: number) => {
    return addDays(date, days);
  },
  format: (date: Date, dateFormat: string) => {
    return format(date, dateFormat);
  },
  formatDistance: (date: Date, from = new Date()) => {
    return formatDistance(date, from, { addSuffix: true });
  },
};
