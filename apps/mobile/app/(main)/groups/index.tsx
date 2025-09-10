import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/util/colors";
import { useQuery } from "@tanstack/react-query";
import { groupApi } from "@/lib/api/group-api";
import GroupCard from "@/components/ui/groups/group-item";
import { router, useFocusEffect } from "expo-router";
import React from "react";

export default function Index() {
  const headerHeight = useHeaderHeight();

  const query = useQuery({ queryKey: ["groups"], queryFn: groupApi.getGroups });

  const addNew = () => {
    router.push("/groups/new");
  };

  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      query.refetch();
    }, [query.refetch]),
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className={`h-52 rounded-b-3xl overflow-hidden flex items-center justify-center`}
        >
          <LinearGradient
            colors={[`${colors.peach}72`, `${colors.sunbeam}28`]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text className="text-forest font-medium text-2xl text-center mb-3">
            Groups 🌱
          </Text>
          <Text className={`text-dustysky text-lg text-center mb-4`}>
            Find your people
          </Text>
          <View className="flex flex-row ml-auto px-6">
            <Pressable onPress={addNew} className={`mr-4 flex-1`}>
              <View className="bg-forest rounded-full h-8 px-4 flex flex-row items-center justify-center">
                <MaterialCommunityIcons name="plus" color="white" size={16} />
                <Text className="text-white font-bold text-sm">Create</Text>
              </View>
            </Pressable>
            <Pressable className={`flex-1`}>
              <View className="bg-white border border-forest rounded-full h-8 px-4 flex flex-row items-center justify-center mr-4">
                <MaterialCommunityIcons
                  name="account-plus-outline"
                  color={colors.forest}
                  size={16}
                />
                <Text className="text-forest font-bold text-sm ml-2">Join</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View className="px-6 flex flex-row items-center"></View>

        <View className={`mt-10 px-4`}>
          {query.isSuccess &&
            query.data.map((group, index) => (
              <GroupCard
                key={group.id}
                group={group}
                lastActive={"2 hours ago"}
                index={index}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
