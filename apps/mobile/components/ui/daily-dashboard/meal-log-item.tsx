import React, {ForwardedRef, forwardRef} from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Meal} from "@one-step/common/dto/daily-dashboard/meal"
import {colors} from "@/util/colors";
import {LinearGradient} from "expo-linear-gradient";

type MealLogItemProps = {
  item: Meal,
  className?: string,
  onPress?: () => Promise<void>,
}

const MealLogItem = (props: MealLogItemProps, ref: ForwardedRef<View>) => {

  return (
    <Pressable onPress={props.onPress} ref={ref} className={`flex flex-col items-center justify-between flex-1 rounded-3xl overflow-hidden h-40 py-6 bg-white`}>
      {props.item.ateAt && <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={[colors.forest, `${colors.dustysky}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.4, y: 1.4 }}
      /> }
      <MaterialCommunityIcons name={"food-apple-outline"} color={props.item.ateAt ? '#fff' : colors.dustysky} size={20} />
      <Text className={`capitalize text-xl ${props.item.ateAt ? 'text-white' : 'text-dustysky'}`}>{props.item.type}</Text>
      <MaterialCommunityIcons className={`${!props.item.ateAt && 'opacity-0'}`} name={'check-circle-outline'} size={18} color={colors.sunbeam} />
    </Pressable>
  )
}

export default forwardRef(MealLogItem);
