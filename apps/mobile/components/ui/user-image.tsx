import { User } from "@one-step/common/types/models/user";
import { Text, View } from "react-native";
import React from "react";

export const UserImage = ({
  user,
  className,
  textClassName,
}: {
  user: User;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <View
      className={`h-10 w-10 rounded-full flex items-center justify-center bg-sunbeam overflow-hidden ${className ?? ""}`}
    >
      <Text className={`text-lg text-forest uppercase ${textClassName ?? ""}`}>
        {user.firstName[0]}
        {user.lastName[0]}
      </Text>
    </View>
  );
};
