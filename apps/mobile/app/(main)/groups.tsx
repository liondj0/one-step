import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/util/colors";
import { useQuery } from "@tanstack/react-query";
import { groupApi } from "@/lib/api/group-api";
import { GroupCard } from "@/components/ui/groups/group-item";

export default function Groups() {
  const headerHeight = useHeaderHeight();

  const query = useQuery({ queryKey: ["groups"], queryFn: groupApi.getGroups });
  console.log(query.data);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <LinearGradient
        colors={[`${colors.peach}23`, "#FFF"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight + 15,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 flex flex-row items-center">
          <Text className="text-forest font-bold text-4xl">Groups</Text>

          <View className="flex flex-row ml-auto">
            <Pressable>
              <View className="bg-white border border-forest rounded-full h-9 px-4 flex flex-row items-center justify-center mr-4">
                <MaterialCommunityIcons
                  name="account-plus-outline"
                  color={colors.forest}
                  size={20}
                />
                <Text className="text-forest font-bold text-lg ml-2">Join</Text>
              </View>
            </Pressable>

            <Pressable>
              <View className="bg-forest rounded-full h-9 px-4 flex flex-row items-center justify-center">
                <MaterialCommunityIcons name="plus" color="white" size={20} />
                <Text className="text-white font-bold text-lg">Create</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View className={`mt-10 px-4`}>
          {query.isSuccess &&
            query.data.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                lastActive={"2 hours ago"}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
