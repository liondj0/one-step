import { getAuthHeaders, httpClientBuilder } from "@/util/http-util";
import { DailyActivity } from "@one-step/common/dto/daily-dashboard/daily-activity-dto";
import { UpdateDailyActivity } from "@one-step/common/dto/daily-dashboard/update-daily-activity";

export const dailyActivityApi = {
  httpClient: httpClientBuilder(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/daily-activities`,
    getAuthHeaders,
  ),
  getDailyActivityForDate: (date: string): Promise<DailyActivity> => {
    return dailyActivityApi.httpClient.get(`/${date}`);
  },
  updateDailyActivity: (
    id: string,
    updateDailyActivity: Partial<UpdateDailyActivity>,
  ) => {
    return dailyActivityApi.httpClient.patch<
      DailyActivity,
      Partial<UpdateDailyActivity>
    >(`/${id}`, updateDailyActivity);
  },
};
