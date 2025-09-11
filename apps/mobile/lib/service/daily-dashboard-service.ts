import { dateUtil } from "@one-step/common/util/date";
import { dailyActivityApi } from "@/lib/api/daily-activity-api";
import { UpdateDailyActivity } from "@one-step/common/dto/daily-dashboard/update-daily-activity";

export const dailyDashboardService = {
  getTodaysDashboard: async () => {
    const date = new Date();
    const formattedDate = dateUtil.format(date, "yyyy-MM-dd");
    return dailyActivityApi.getDailyActivityForDate(formattedDate);
  },
  saveDailyActivity: async (id: string, data: Partial<UpdateDailyActivity>) => {
    await dailyActivityApi.updateDailyActivity(id, data);
  },
};
