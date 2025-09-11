import { getUserInSession } from "../util/session-util";
import { dailyActivityRepo } from "../repo/daily-activity-repo";
import { DailyActivityEntity } from "../entity/daily-activity-entity";

export const findUsersActivityForDate = async ({ date }: { date: string }) => {
  const user = getUserInSession();
  const existingDailyActivity =
    await dailyActivityRepo().findUsersActivityForDate({ date });
  if (existingDailyActivity) return existingDailyActivity;
  const newDailyActivity = new DailyActivityEntity();
  newDailyActivity.user = user;
  newDailyActivity.date = date;
  newDailyActivity.meals = [
    { type: "breakfast" },
    { type: "lunch" },
    { type: "dinner" },
  ];
  return dailyActivityRepo().save(newDailyActivity);
};

export const updateUsersActivityForDate = async (id: string, updateData: Partial<DailyActivityEntity>) => {
  const existingActivity = await dailyActivityRepo().findOne({id, userId: getUserInSession().id})
  if (!existingActivity) throw new Error("Activity not found")
  Object.assign(existingActivity, updateData)
  return dailyActivityRepo().save(existingActivity)
}
