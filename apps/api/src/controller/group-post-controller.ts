import { DELETE, GET, PATCH, POST, USE } from "../util/middleware/router-util";
import { BaseController } from "./base-controller";
import { type EndpointContext } from "../types/server";
import { authMiddleware } from "../util/middleware/auth-util";
import {
  createGroupPost,
  deleteGroupPost,
  getGroupPosts,
  updateGroupPost,
} from "../service/group-post-service";
import { Transactional } from "../util/middleware/transaction-util";
import { createGroupPostSchema } from "@one-step/common/dto/group/create-group-post";
import {BadRequestError} from "../util/error";

export class GroupPostController extends BaseController {
  constructor() {
    super("/group-posts");
  }


  @GET("/")
  @USE(authMiddleware)
  @Transactional()
  async getGroupPosts(context: EndpointContext) {
    const groupId = context.req.query("groupId");
    if(!groupId) throw new BadRequestError("groupId is required"  )
    return await getGroupPosts({groupId});
  }

  @POST("/")
  @USE(authMiddleware)
  @Transactional()
  async createGroupPost(context: EndpointContext) {
    const body = createGroupPostSchema.parse(await context.req.json());
    const groupId = context.req.param("groupId");
    return await createGroupPost(groupId, body);
  }

  @PATCH("/:postId")
  @USE(authMiddleware)
  @Transactional()
  async updateGroupPost(context: EndpointContext) {
    const body = createGroupPostSchema.parse(await context.req.json());
    const postId = context.req.param("postId");
    return await updateGroupPost(postId, body);
  }

  @DELETE("/:postId")
  @USE(authMiddleware)
  @Transactional()
  async deleteGroupPost(context: EndpointContext) {
    const postId = context.req.param("postId");
    return await deleteGroupPost(postId);
  }
}
