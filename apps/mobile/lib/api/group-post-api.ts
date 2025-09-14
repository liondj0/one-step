import { getAuthHeaders, httpClientBuilder } from "@/util/http-util";
import { GroupPost } from "@one-step/common/dto/group/group-post";
import { CreateGroupPostDto } from "@one-step/common/dto/group/create-group-post";

export const groupPostApi = {
  httpClient: httpClientBuilder(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/group-posts`,
    getAuthHeaders,
  ),

  getPostsForGroup: (id: string): Promise<GroupPost[]> => {
    return groupPostApi.httpClient.get(`/?groupId=${id}`);
  },

  saveNewPost: (post: CreateGroupPostDto): Promise<GroupPost> => {
    return groupPostApi.httpClient.post(`/`, post);
  },
};
