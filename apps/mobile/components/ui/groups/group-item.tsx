import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Group } from "@one-step/common/dto/group/group";
import { forwardRef, Ref } from "react";

type GroupCardProps = {
  group: Group;
  lastActive: string; // e.g., "2 hours ago"
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
};

function GroupCard(
  {
    group,
    lastActive,
    isFavorite = false,
    onPress,
    onToggleFavorite,
  }: GroupCardProps,
  ref: Ref<View>,
) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl bg-white/95 border border-peach/30 px-4 py-4 mb-4 mx-1"
      android_ripple={{ color: "#00000010" }}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
      }}
    >
      {/* Top row: title + status + actions */}
      <View className="flex-row items-center">
        <Text className="text-forest font-bold text-xl mr-2" numberOfLines={1}>
          {group.name}
        </Text>

        {/* status pill */}
        <View className="px-2 py-0.5 rounded-full bg-sunbeam/30 border border-sunbeam/60">
          <Text className="text-ink/70 text-xs font-semibold">
            {group.isPublic ? "Open" : "Invite only"}
          </Text>
        </View>

        <View className="ml-auto flex-row items-center">
          <Pressable hitSlop={8} onPress={onToggleFavorite} className="mr-2">
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? "#FFB199" : "#FFB199"}
            />
          </Pressable>

          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color="#7DA2A9"
          />
        </View>
      </View>

      {/* Description */}
      <Text className="text-dustysky mt-2 leading-5">{group.description}</Text>

      {/* Footer */}
      <View className="flex-row items-center mt-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="account-group-outline"
            size={16}
            color="#7DA2A9"
          />
          <Text className="text-dustysky ml-2">{group.usersCount} members</Text>
        </View>

        <Text className="text-dustysky ml-auto">{lastActive}</Text>
      </View>
    </Pressable>
  );
}

export default forwardRef(GroupCard);
