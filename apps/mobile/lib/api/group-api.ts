import { getAuthHeaders, httpClientBuilder } from "@/util/http-util";
import { Group } from "@one-step/common/dto/group/group";
import { CreateGroupDto } from "@one-step/common/dto/group/create-group-dto";

export const groupApi = {
  httpClient: httpClientBuilder(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/groups`,
    getAuthHeaders,
  ),
  getGroups: (): Promise<Group[]> => {
    return groupApi.httpClient.get(``);
  },
  saveGroup: (createGroupDto: CreateGroupDto) => {
    return groupApi.httpClient.post<Group, CreateGroupDto>(``, createGroupDto);
  },
  getGroupById: (id: string): Promise<Group> => {
    return groupApi.httpClient.get(`/${id}`);
  },
};
