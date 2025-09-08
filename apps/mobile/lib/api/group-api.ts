import { getAuthHeaders, httpClientBuilder } from "@/util/http-util";
import { Group } from "@one-step/common/dto/group/group";

export const groupApi = {
  httpClient: httpClientBuilder(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/groups`,
    getAuthHeaders,
  ),
  getGroups: (): Promise<Group[]> => {
    console.log(`getGroups`)
    return groupApi.httpClient.get(``);
  },
};
