import {DELETE, GET, PATCH, POST, USE} from "../util/middleware/router-util";
import { BaseController } from "./base-controller";
import { type EndpointContext } from "../types/server";
import { authMiddleware } from "../util/middleware/auth-util";
import { createGroupSchema } from "@one-step/common/dto/group/create-group-dto";
import {
  createGroup,
  createGroupPost,
  deleteGroupPost,
  getGroupById,
  getGroupPosts,
  updateGroupPost
} from "../service/group-service";
import { Transactional } from "../util/middleware/transaction-util";
import { groupRepo } from "../repo/group-repo";
import { getUserInSession } from "../util/session-util";
import { createGroupPostSchema } from "@one-step/common/dto/group/create-group-post";

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
    return getGroupById(context.req.param("groupId"))
  }

  @GET("/:groupId/posts")
  @USE(authMiddleware)
  @Transactional()
  async getGroupPosts(context: EndpointContext) {
    const groupId = context.req.param("groupId");
    return await getGroupPosts(groupId);
  }

  @POST("/:groupId/posts")
  @USE(authMiddleware)
  @Transactional()
  async createGroupPost(context: EndpointContext) {
    const body = createGroupPostSchema.parse(await context.req.json());
    const groupId = context.req.param("groupId");
    return await createGroupPost(groupId, body);
  }

  @PATCH("/:groupId/posts/:postId")
  @USE(authMiddleware)
  @Transactional()
  async updateGroupPost(context: EndpointContext) {
    const body = createGroupPostSchema.parse(await context.req.json());
    const postId = context.req.param("postId");
    return await updateGroupPost(postId, body);
  }

  @DELETE("/:groupId/posts/:postId")
  @USE(authMiddleware)
  @Transactional()
  async deleteGroupPost(context: EndpointContext) {
    const postId = context.req.param("postId")
    return await deleteGroupPost(postId)
  }
}
