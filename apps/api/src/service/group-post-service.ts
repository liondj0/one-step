import {groupPostRepo} from "../repo/group-post-repo";
import {getUserInSession} from "../util/session-util";
import {userInGroupRepo} from "../repo/user-in-group-repo";
import {NotFoundError} from "../util/error";
import {GroupPostEntity} from "../entity/group-post-entity";
import {getGroupById} from "./group-service";
import { CreateGroupPostDto } from "packages/common/dto/post/create-group-post";
import { AddReactionDto } from "packages/common/dto/reactions/add-reaction";
import {ReactionEntity} from "../entity/reaction-entity";
import {ReactionsGroupEntity} from "../entity/reactions-group-entity";
import {reactionRepo} from "../repo/reaction-repo";
import {RequestContext} from "@mikro-orm/postgresql";
import {reactionsGroupRepo} from "../repo/reactions-group-repo";

export const getGroupPosts = async (params: { groupId: string }) => {
  await getGroupById(params.groupId);
  return  groupPostRepo().getPostsForGroupId(params.groupId);
};

export const createGroupPost = async (
  params: CreateGroupPostDto,
) => {
  const user = getUserInSession();
  const userInGroup = await userInGroupRepo().findOne({
    group: { id: params.groupId },
    user: { id: user.id },
  });
  if (!userInGroup) throw new NotFoundError(`Group ${params.groupId} not found`);
  const groupPost = new GroupPostEntity();
  groupPost.group = userInGroup.group;
  groupPost.user = userInGroup.user;
  groupPost.message = params.message;
  groupPost.reactionsGroup = new ReactionsGroupEntity();
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

export const addReaction = async (params: AddReactionDto) => {
  const user = getUserInSession();
  const reaction = new ReactionEntity();
  reaction.user = user;
  reaction.emoji = params.emoji;
  reaction.reactionsGroup = (RequestContext.getEntityManager())!.getReference(ReactionsGroupEntity, params.reactionGroupId)
  await reactionRepo().upsert(reaction);
  return reactionsGroupRepo().findOne({ id: params.reactionGroupId });
}

export const removeReaction = async (reactionId: string) => {
  const reaction = await reactionRepo().findOne({ id: reactionId });
  if(!reaction) throw new NotFoundError(`Reaction ${reactionId} not found`);
  await reactionRepo().nativeDelete(reaction.id)
  return await reactionsGroupRepo().findOne({ id: reaction.reactionsGroup.id });
}
