import { BaseController } from "./base-controller";
import {GET, PATCH, POST, USE} from "../util/middleware/router-util";
import { authMiddleware } from "../util/middleware/auth-util";
import type { EndpointContext } from "../types/server";
import {findUsersActivityForDate, updateUsersActivityForDate} from "../service/daily-activity-service";
import { Transactional } from "../util/middleware/transaction-util";
import {dailyActivitiesSchema} from "../../../../packages/common/dto/daily-dashboard/daily-activity-dto";
import {updateDailyActivitySchema} from "../../../../packages/common/dto/daily-dashboard/update-daily-activity";

export class DailyActivityController extends BaseController {
  constructor() {
    super("/daily-activities");
  }

  @GET("/:date")
  @USE(authMiddleware)
  @Transactional()
  async getMyGroups(context: EndpointContext) {
    const date = context.req.param("date");
    return dailyActivitiesSchema.parse(await findUsersActivityForDate({date}));
  }

  @PATCH("/:id")
  @USE(authMiddleware)
  @Transactional()
  async patchDailyActivity(context: EndpointContext) {
    const id = context.req.param("id");
    const data = updateDailyActivitySchema.parse(await context.req.json());
    return updateUsersActivityForDate(id, data)
  }
}
