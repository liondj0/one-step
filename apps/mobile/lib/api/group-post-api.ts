import { getAuthHeaders, httpClientBuilder } from "@/util/http-util";
import { GroupPost } from "@one-step/common/dto/post/group-post";
import { CreateGroupPostDto } from "@one-step/common/dto/post/create-group-post";
import { AddReactionDto } from "@one-step/common/dto/reactions/add-reaction";
import { ReactionsGroup } from "@one-step/common/dto/reactions/reactions-group";

export const groupPostApi = {
  httpClient: httpClientBuilder(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/group-posts`,
    getAuthHeaders,
  ),

  getPostsForGroup: (id: string): Promise<GroupPost[]> => {
    return groupPostApi.httpClient.get(`?groupId=${id}`);
  },

  saveNewPost: (post: CreateGroupPostDto): Promise<GroupPost> => {
      return groupPostApi.httpClient.post(``, post);
  },

  addReaction: (postId: string, addReactionDto: AddReactionDto): Promise<ReactionsGroup> => {
    return groupPostApi.httpClient.post(`/${postId}/reactions`, addReactionDto);
  },

  removeReaction: (postId: string, reactionId: string): Promise<ReactionsGroup> => {
    return groupPostApi.httpClient.delete(`/${postId}/reactions/${reactionId}`);
  },
};
