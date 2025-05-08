import { Image, Text } from "react-native";

export default function FirstScreen() {
  return (
    <>
      <Image
        source={require("@/assets/images/logo.png")}
        className={`h-36 mt-3`}
        style={{ objectFit: "contain" }}
      />
      <Text className="text-forest font-bold text-5xl font-libreBold leading-[1.25] text-center w-4/5">
        Welcome to One Step
      </Text>
      <Image
        source={require("@/assets/images/onboarding/1.png")}
        className={`h-52 `}
        style={{ objectFit: "contain" }}
      />
      <Text className="text-forest font-medium text-3xl leading-[1.25] text-center w-3/5">
        Build better habits, {"\n"} one step at a time.
      </Text>
    </>
  );
}
