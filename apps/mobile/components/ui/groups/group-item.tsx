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
  index: number;
};

function GroupCard(
  {
    group,
    lastActive,
    isFavorite = false,
    onPress,
    onToggleFavorite,
    index,
  }: GroupCardProps,
  ref: Ref<View>,
) {
  const borderLeftColors = [
    "border-forest",
    "border-peach",
    "border-sunbeam",
    "border-dustysky",
  ];

  const style = group.isPublic ? "bg-sunbeam/30 border-sunbeam/60" : "bg-peach/30 border-peach/60";
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-2xl bg-white/95 px-4 py-4 mb-4 mx-1 shadow-2xl border-l-4 ${borderLeftColors[index % 4]}`}
      android_ripple={{ color: "#00000010" }}
      style={{
        elevation: 4,
      }}
      ref={ref}
    >
      <View className="flex-row items-center">
        <Text className="text-ink font-medium  mr-2" numberOfLines={1}>
          {group.name}
        </Text>

        {/* status pill */}
        <View className={`px-2 py-0.5 rounded-full border flex flex-row items-center ${style}`}>
          {group.isPublic && (
            <MaterialCommunityIcons name={`web`} size={16} color={`#973c00`} />
          )}
          {!group.isPublic && (
            <MaterialCommunityIcons
              name={`lock-outline`}
              size={16}
              color={`#9f2d00`}
            />
          )}
          <Text className="text-ink/70 text-xs font-semibold ml-1">
            {group.isPublic ? "Open" : "Invite only"}
          </Text>
        </View>

        <View className="ml-auto flex-row items-center">
          <Pressable hitSlop={8} onPress={onToggleFavorite}>
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FFB199" : "#FFB199"}
            />
          </Pressable>
        </View>
      </View>

      {/* Description */}
      <Text numberOfLines={3} className="text-dustysky mt-2 leading-5">{group.description}</Text>

      {/* Footer */}
      <View className="flex-row items-center mt-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="account-multiple-outline"
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
