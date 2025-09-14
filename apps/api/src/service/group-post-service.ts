import {groupPostRepo} from "../repo/group-post-repo";
import {getUserInSession} from "../util/session-util";
import {userInGroupRepo} from "../repo/user-in-group-repo";
import {NotFoundError} from "../util/error";
import {GroupPostEntity} from "../entity/group-post-entity";
import {getGroupById} from "./group-service";
import { CreateGroupPostDto } from "@one-step/common/dto/group/create-group-post";

export const getGroupPosts = async (params: { groupId: string }) => {
  await getGroupById(params.groupId);
  return groupPostRepo().getPostsForGroupId(params.groupId);
};

export const createGroupPost = async (
  groupId: string,
  params: CreateGroupPostDto,
) => {
  const user = getUserInSession();
  const userInGroup = await userInGroupRepo().findOne({
    group: { id: groupId },
    user: { id: user.id },
  });
  if (!userInGroup) throw new NotFoundError(`Group ${groupId} not found`);
  const groupPost = new GroupPostEntity();
  groupPost.group = userInGroup.group;
  groupPost.user = userInGroup.user;
  groupPost.message = params.message;
  return groupPostRepo().save(groupPost);
};

export const updateGroupPost = async (
  postId: string,
  params: CreateGroupPostDto,
) => {
  const groupPost = await groupPostRepo().findOne({ id: postId });
  if (!groupPost || groupPost.user.id !== getUserInSession().id)
    throw new NotFoundError(`Group post ${postId} not found`);
  groupPost.message = params.message;
  return groupPostRepo().save(groupPost);
};

export const deleteGroupPost = async (postId: string) => {
  const groupPost = await groupPostRepo().findOne({ id: postId });
  if (!groupPost || groupPost.user.id !== getUserInSession().id)
    throw new NotFoundError(`Group post ${postId} not found`);
  return groupPostRepo().delete(groupPost);
};
