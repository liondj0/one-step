


import {Stack} from "expo-router";
import {View, Image} from "react-native";


export default function AuthLayout () {
  return (
    <View className="flex-1 items-center justify-start bg-soft pt-16 px-6">
      <Image
        source={require('@/assets/images/logo.png')}
        className="h-20 w-auto mb-6 object-contain"
      />

      <View className="w-full flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  )
}
