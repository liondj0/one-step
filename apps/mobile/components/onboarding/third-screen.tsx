import {Image, Text} from "react-native";


export default function ThirdScreen() {

  return <>
    <Text className="text-forest text-5xl font-libre tracking-tighter leading-[1.25] text-center w-6/8 mt-6">
      Progress that {"\n"} feels good
    </Text>
    <Image source={require("@/assets/images/onboarding/3.png")} className={`h-2/5`} style={{objectFit: 'contain'}} />
    <Text className="text-forest font-medium text-3xl leading-[1.25] text-center w-3/5">
      No streaks. Just showing up.
    </Text>
  </>
}
