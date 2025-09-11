import { SideQuest } from "@one-step/common/dto/daily-dashboard/side-quest";
import {Pressable, StyleSheet, Text, View} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { forwardRef, Ref } from "react";
import {colors} from "@/util/colors";
import {LinearGradient} from "expo-linear-gradient";

type SideQuestItemProps = {
  item: SideQuest;
  onPress: () => void;
};

const SideQuestItem = (props: SideQuestItemProps, ref: Ref<View>) => {
  return (
    <Pressable
      ref={ref}
      onPress={props.onPress}
      className={`flex flex-row items-center mb-2 p-3 overflow-hidden rounded-xl`}
    >
      <LinearGradient
        colors={[`${colors.dustysky}3F`, `${colors.sunbeam}3F`]}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.75]}
        style={StyleSheet.absoluteFill}
      />
      <View
        className={`border border-forest rounded-lg h-8 w-8 flex items-center justify-center ${props.item.completedAt ? "bg-forest" : "bg-white"}`}
      >
        <MaterialCommunityIcons name={"check"} color={"#fff"} size={18} />
      </View>
      <Text
        className={`ml-4 text-lg ${props.item.completedAt ? "line-through" : ""}`}
      >
        {props.item.label}
      </Text>
      {props.item.completedAt && <Text className={`text-xl ml-auto`}>✨</Text>}
    </Pressable>
  );
};

export default forwardRef(SideQuestItem);
