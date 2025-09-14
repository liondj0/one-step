import { getAuthHeaders, httpClientBuilder } from "@/util/http-util";
import { GroupPost } from "@one-step/common/dto/group/group-post";

export const groupPostApi = {
  httpClient: httpClientBuilder(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/group-posts`,
    getAuthHeaders,
  ),

  getPostsForGroup: (id: string): Promise<GroupPost[]> => {
    return groupPostApi.httpClient.get(`/${id}/posts`);
  },

  saveNewPost: (id: string, post: Partial<GroupPost>): Promise<GroupPost> => {
    return groupPostApi.httpClient.post(`/${id}/posts`, post);
  },
};
