import { GET, POST, USE } from "../util/middleware/router-util";
import { BaseController } from "./base-controller";
import { type EndpointContext } from "../types/server";
import { authMiddleware } from "../util/middleware/auth-util";
import { createGroupSchema } from "../../../../packages/common/dto/group/create-group-dto";
import { createGroup } from "../service/group-service";
import { Transactional } from "../util/middleware/transaction-util";
import { groupRepo } from "../repo/group-repo";
import { getUserInSession } from "../util/session-util";

export class GroupController extends BaseController {
  constructor() {
    super("/groups");
  }

  @GET("/")
  @USE(authMiddleware)
  async getMyGroups() {
    return groupRepo().find({ userId: getUserInSession().id });
  }

  @POST("/")
  @USE(authMiddleware)
  @Transactional()
  async createGroup(context: EndpointContext) {
    const body = createGroupSchema.parse(await context.req.json());
    return await createGroup(body);
  }
}
