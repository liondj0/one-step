import { View, Text, Pressable, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Group } from "@one-step/common/dto/group/group";
import { forwardRef, Ref, useState } from "react";
import * as Haptics from "expo-haptics";
import {router} from "expo-router";

type GroupCardProps = {
  group: Group;
  lastActive: string; // e.g., "2 hours ago"
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  index: number;
};
type MenuAction = "open" | "edit" | "share" | "leave";

function MenuSheet({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (a: MenuAction) => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <View className="mt-auto bg-white rounded-t-2xl p-3">
          {[
            { key: "open", label: "Open" },
            { key: "edit", label: "Edit" },
            { key: "share", label: "Share link" },
            { key: "leave", label: "Leave group", destructive: true },
          ].map((it) => (
            <Pressable
              key={it.key}
              className={`p-4 ${it.destructive ? "text-red-500" : ""}`}
              onPress={() => {
                onSelect(it.key as MenuAction);
                onClose();
              }}
            >
              <Text className={it.destructive ? "text-red-500" : ""}>
                {it.label}
              </Text>
            </Pressable>
          ))}
          <Pressable className="p-4" onPress={onClose}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

function GroupCard(
  {
    group,
    lastActive,
    isFavorite = false,
    onToggleFavorite,
    index,
  }: GroupCardProps,
  ref: Ref<View>,
) {
  const [menuOpen, setMenuOpen] = useState(false);
  const borderLeftColors = [
    "border-forest",
    "border-peach",
    "border-sunbeam",
    "border-dustysky",
  ];

  const style = group.isPublic
    ? "bg-sunbeam/30 border-sunbeam/60"
    : "bg-peach/30 border-peach/60";
  return (
    <Pressable
      onPress={()  => router.push(`/groups/${group.id}`)}
      className={`rounded-2xl bg-white/95 px-4 py-4 mb-4 mx-1 shadow-2xl border-l-4 ${borderLeftColors[index % 4]}`}
      android_ripple={{ color: "#00000010" }}
      style={{
        elevation: 4,
      }}
      ref={ref}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setMenuOpen(true);
      }}
    >
      <View className="flex-row items-center">
        <Text className="text-ink font-medium  mr-2" numberOfLines={1}>
          {group.name}
        </Text>

        {/* status pill */}
        <View
          className={`px-2 py-0.5 rounded-full border flex flex-row items-center ${style}`}
        >
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
      <Text numberOfLines={3} className="text-dustysky mt-2 leading-5">
        {group.description}
      </Text>

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
      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={(a) => {
          console.log("Menu action: ", a);
        }}
      />
    </Pressable>
  );
}

export default forwardRef(GroupCard);
