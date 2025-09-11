import {SideQuest} from "@one-step/common/dto/daily-dashboard/side-quest"
import {Pressable, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {forwardRef, Ref} from "react";

type SideQuestItemProps = {
  item: SideQuest
  onPress: () => void;
}

const SideQuestItem = (props: SideQuestItemProps, ref: Ref<View>) => {
  return <Pressable ref={ref} onPress={props.onPress} className={`flex flex-row items-center mb-2 p-3`}>
    <View className={`border border-forest rounded-lg h-8 w-8 flex items-center justify-center ${props.item.completedAt ? 'bg-forest' : 'bg-white'}`}>
      <MaterialCommunityIcons name={'check'} color={'#fff'} size={18} />
    </View>
    <Text className={`ml-4 text-lg ${props.item.completedAt ? 'line-through' : ''}`}>{props.item.label}</Text>
    {props.item.completedAt && (<Text className={`text-xl ml-auto`}>✨</Text>)}
  </Pressable>
}

export default forwardRef(SideQuestItem);
