import { User } from "@one-step/common/types/models/user";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/util/colors";
import React from "react";

export const UserImage = ({
  user,
  className,
  textClassName
}: {
  user: User;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <View
      className={`h-10 w-10 rounded-full flex items-center justify-center overflow-hidden ${className ?? ''}`}
    >
      <LinearGradient
        colors={[colors.sunbeam, colors.peach]}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.75]}
        style={StyleSheet.absoluteFill}
      />
      <Text className={`text-lg text-ink uppercase ${textClassName ?? ''}`}>
        {user.firstName[0]}
        {user.lastName[0]}
      </Text>
    </View>
  );
};
