import {Image, Text} from "react-native";


export default function SecondScreen() {

  return <>
    <Text className="text-forest text-5xl font-libre tracking-tighter leading-[1.25] text-center w-6/8 mt-6">
      Group support
    </Text>
    <Image source={require("@/assets/images/onboarding/2.png")} className={`w-full my-0 my-[-2rem]`} style={{objectFit: 'contain'}} />
    <Text className="text-forest font-semibold text-2xl leading-[1.25] text-center w-3/5">
      Build better habits, {"\n"} one step at a time.
    </Text>
  </>
}
