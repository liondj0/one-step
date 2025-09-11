import { CreateGroupDto } from "@one-step/common/dto/group/create-group-dto";
import { GroupEntity } from "../entity/group-entity";
import { groupRepo } from "../repo/group-repo";
import { UserInGroupEntity } from "../entity/user-in-group-entity";
import { UserInGroupRole } from "../enum/user-in-group-role";
import { UserInGroupStatus } from "../enum/user-in-group-status";
import { userInGroupRepo } from "../repo/user-in-group-repo";
import { getUserInSession } from "../util/session-util";
import { CreateGroupPostDto } from "@one-step/common/dto/group/create-group-post";
import { NotFoundError } from "../util/error";
import { GroupPostEntity } from "../entity/group-post-entity";
import { groupPostRepo } from "../repo/group-post-repo";

export const createGroup = async (params: CreateGroupDto) => {
  const group = new GroupEntity(params);
  groupRepo().save(group);

  const userInGroup = new UserInGroupEntity();
  userInGroup.user = getUserInSession();
  userInGroup.group = group;
  userInGroup.role = UserInGroupRole.ADMIN;
  userInGroup.status = UserInGroupStatus.ACTIVE;
  userInGroupRepo().save(userInGroup);

  return group;
};

export const getGroupById = async (id: string) => {
  const userInGroup = await userInGroupRepo().findOne({
    group: { id },
    user: { id: getUserInSession().id },
  });
  if (!userInGroup) throw new NotFoundError(`Group ${id} not found`);
  return userInGroup.group;
};

export const getGroupPosts = async (groupId: string) => {
  await getGroupById(groupId);
  return groupPostRepo().getPostsForGroupId(groupId);
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
