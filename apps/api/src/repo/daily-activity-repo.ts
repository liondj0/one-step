import { BaseRepo } from "./base-repo";
import { DailyActivityEntity } from "../entity/daily-activity-entity";

export class DailyActivityRepo extends BaseRepo<DailyActivityEntity> {
  constructor() {
    super(DailyActivityEntity);
  }

  async findUsersActivityForDate(params: { date: string }) {
    return this.entityManager.findOne(DailyActivityEntity, params);
  }
}

export const dailyActivityRepo = () => new DailyActivityRepo();
