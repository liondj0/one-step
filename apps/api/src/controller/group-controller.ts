import { DELETE, GET, PATCH, POST, USE } from "../util/middleware/router-util";
import { BaseController } from "./base-controller";
import { type EndpointContext } from "../types/server";
import { authMiddleware } from "../util/middleware/auth-util";
import { createGroupSchema } from "@one-step/common/dto/group/create-group-dto";
import {
  createGroup,
  getGroupById,
} from "../service/group-service";
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

  @GET("/:groupId")
  @USE(authMiddleware)
  async getGroup(context: EndpointContext) {
    return getGroupById(context.req.param("groupId"));
  }

}
