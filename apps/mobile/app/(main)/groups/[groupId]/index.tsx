import { View, ScrollView, Pressable } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { groupApi } from "@/lib/api/group-api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/util/colors";
import React from "react";
import GroupPostItem from "@/components/ui/groups/group-post-item";
import { useHeaderAction } from "@/lib/use-header-actions";
import { TwoLineTitle } from "@/components/ui/drawer/two-line-title";
import {groupPostApi} from "@/lib/api/group-post-api";

export default function GroupFeed() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const headerHeight = useHeaderHeight();

  const query = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => {
      const group = await groupApi.getGroupById(groupId);
      if (!group) router.back();
      const posts = await groupPostApi.getPostsForGroup(groupId);
      return { group, posts };
    },
  });

  const navigation = useNavigation();
  const groupName = query.data?.group?.name;

  useHeaderAction(navigation.getParent(), {
    title: <TwoLineTitle title={groupName ?? "Group"} subTitle={`Feed`} />,
    right: (
      <View className={`ml-auto flex-row pr-6`}>
        <Pressable className={`mr-4`} onPress={() => router.push(`/groups/${groupId}/new-post`)}>
          <MaterialCommunityIcons
            name={"plus"}
            color={colors.dustysky}
            size={24}
          />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name={"cog-outline"}
            color={colors.dustysky}
            size={24}
          />
        </Pressable>
      </View>
    ),
  });

  return (
    <View style={{ flex: 1 }} className={`px-6 bg-paper`}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className={`flex mt-6`}>
          {query.data?.posts.map((post, index) => (
            <GroupPostItem key={index} post={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
