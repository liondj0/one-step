import { forwardRef, Ref } from "react";
import { Pressable, View, Text } from "react-native";
import { Bullet } from "@/components/ui/bullet";

type GroupPrivacyOptionProps = {
  title: string;
  subTitle: string;
  selected: boolean;
  children: React.ReactNode;
};

function GroupPrivacyOption(
  { selected, title, subTitle, children }: GroupPrivacyOptionProps,
  ref: Ref<View>,
) {
  const isPublic = title === "Open";
  const activeSoftBgColor = isPublic ? "bg-sunbeam/40" : "bg-peach/40";
  const activeBgColor = isPublic ? "bg-sunbeam" : "bg-peach";
  const activeBorderColor = isPublic ? "border-sunbeam" : "border-peach";

  return (
    <View
      ref={ref}
      className={`flex flex-row items-center justify-center border p-5 rounded-2xl ${selected ? `${activeSoftBgColor} ${activeBorderColor}` : "border-dustysky"}`}
    >
      <View
        className={`w-6 h-6 rounded-full ${activeBgColor} flex items-center justify-center mr-4`}
      >
        {selected && <Bullet className={`bg-forest`} />}
      </View>
      <View
        className={`w-10 h-10 rounded-full ${activeBgColor} flex items-center justify-center `}
      >
        {children}
      </View>
      <View className="flex-1 ml-2">
        <Text className={`text-ink font-medium`}>{title}</Text>
        <Text className={`text-dustysky font-medium`}>{subTitle}</Text>
      </View>
    </View>
  );
}

export default forwardRef(GroupPrivacyOption);
