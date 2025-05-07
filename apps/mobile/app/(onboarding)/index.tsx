import { Text, View, Image, Button } from "react-native";
import {Link} from "expo-router";

export default function Onboarding() {

  return (
    <View className="flex-1 flex-col items-center justify-between py-20 bg-soft">
      <Image source={require("@/assets/images/logo.png")} className={`h-36 mt-3`} style={{objectFit: 'contain'}} />
      <Text className="text-forest font-bold text-5xl font-libreBold leading-[1.25] text-center w-4/5">
        Welcome to One Step
      </Text>
      <Image source={require("@/assets/images/onboarding/1.png")} className={`h-52 `} style={{objectFit: 'contain'}} />
      <Text className="text-forest font-semibold text-2xl leading-[1.25] text-center w-3/5">
        Build better habits, {"\n"} one step at a time.
      </Text>
      <Link href={"/(onboarding)"} className={`btn`}>Continue</Link>
    </View>
  );
}
