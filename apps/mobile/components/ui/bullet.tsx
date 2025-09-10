import { View } from "react-native";

export const Bullet = ({ className }: { className: string }) => {
  return (
    <View>
      <View className={`bullet mr-2 ${className}`}></View>
    </View>
  );
};
