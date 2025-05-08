import {Pressable, Text} from "react-native";


export default function Button({onPress, children, className }: {onPress: () => void, children: string, className?: string}) {
  return <Pressable onPress={onPress} className={`bg-button py-2 px-12 rounded-3xl ${className ?? ''}`}>
    <Text className={`text-forest text-3xl font-nunito font-semibold`}>{children}</Text>
  </Pressable>
}
