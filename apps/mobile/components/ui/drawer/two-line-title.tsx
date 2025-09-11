import { Text, View } from "react-native";

export const TwoLineTitle = (props: { title: string; subTitle: string }) => {
  return (
    <View className={`ml-4`}>
      <Text className={`text-forest text-xl font-semibold`}>{props.title}</Text>
      <Text className={`text-forest `}>{props.subTitle}</Text>
    </View>
  );
};
