import {View, Text, ScrollView, Pressable, StyleSheet} from "react-native";
import {useHeaderHeight} from "@react-navigation/elements";
import {router, useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {groupApi} from "@/lib/api/group-api";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/util/colors";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import GroupPostItem from "@/components/ui/groups/group-post-item";


export default function GroupFeed() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const headerHeight = useHeaderHeight();

  const query = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const group = await groupApi.getGroupById(groupId);
      if(!group) router.back()
      const posts = await groupApi.getPostsForGroup(groupId);
      return {group, posts}
    }
  })

  return (
    <View style={{ flex: 1 }} className={`px-6 bg-paper`}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: 40,
        }}

        showsVerticalScrollIndicator={false}
      >
        <View className={`py-4 flex-row items-center`}>
          <Pressable  onPress={() => router.back()} className={`mr-4`}>
            <MaterialCommunityIcons name={"arrow-left"} color={colors.forest} size={20} />
          </Pressable>
          <View>
            <Text className={`text-xl text-forest font-medium`}>{query.data?.group?.name} 💬</Text>
            <Text className={`text-base text-forest`}>Feed</Text>
          </View>
          <View className={`ml-auto flex-row`}>
            <Pressable className={`mr-4`}>
              <MaterialCommunityIcons name={"account-multiple-outline"} color={colors.dustysky} size={24} />
            </Pressable>
            <Pressable>
              <MaterialCommunityIcons name={"cog-outline"} color={colors.dustysky} size={24} />
            </Pressable>
          </View>
        </View>
        <View className={`flex flex-row justify-center items-center rounded-2xl my-2 py-1.5 overflow-hidden`}>
          <LinearGradient
            colors={[colors.sunbeam, colors.peach]}
            start={{ x: 0.3, y: 0.3 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.75]}
            style={StyleSheet.absoluteFill}
          />
          <MaterialCommunityIcons name={'plus'} size={24} color={colors.ink} />
          <Text className={`text-ink text-lg ml-3`}>Share your progress</Text>
        </View>
        <View className={`flex mt-6`}>
          {query.data?.posts.map((post, index) => (<GroupPostItem key={index} post={post} />))}
        </View>
      </ScrollView>
    </View>
  )
}
