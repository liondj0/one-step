// components/PrivacyOption.tsx
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type VisualState = "inactive" | "hover" | "active";

type Props = {
  title: string;
  subtitle: string;
  selected?: boolean; // convenience: maps to "active"
  state?: VisualState; // override state when needed
  palette: {
    bgTint: string;
    bgTintStrong: string;
    border: string;
    iconBg: string;
    icon: string;
    ringShadow: string;
    edge: string;
  };
};

export function GroupPrivacyOption({
  title,
  subtitle,
  selected,
  state: forcedState,
  palette,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const visual: VisualState =
    forcedState ?? (selected ? "active" : hovered ? "hover" : "inactive");

  // base container styles
  const base =
    "rounded-2xl px-4 py-3 flex-row items-center gap-3 overflow-hidden";

  // state styles
  const byState: Record<VisualState, string> = {
    inactive: `bg-white border border-black/10`,
    hover: `${palette.bgTint} border ${palette.border} shadow-sm`,
    active: `${palette.bgTintStrong} border ${palette.border} ${palette.ringShadow}`,
  };


  return (
    <View className={`${base} ${byState[visual]}`}>
      <View
        className={[
          "h-6 w-6 rounded-full items-center justify-center",
          visual === "active" ? "bg-white/40 border-2" : "bg-white border",
          palette.border,
        ].join(" ")}
      >
        <View
          style={{
            backgroundColor:
              visual === "active" ? palette.iconBg : "transparent",
          }}
          className="h-3 w-3 rounded-full"
        />
      </View>

      {/* tone icon bubble */}
      <View
        style={{ backgroundColor: palette.iconBg }}
        className="h-8 w-8 rounded-full items-center justify-center"
      >
        <MaterialCommunityIcons
          name={title.toLowerCase() === "open" ? "web" : "lock-outline"}
          size={18}
          color={palette.icon}
        />
      </View>

      {/* text */}
      <View className="flex-1">
        <Text className="text-ink font-semibold">{title}</Text>
        <Text className="text-dustysky mt-0.5"> {subtitle} </Text>
      </View>
    </View>
  );
}
