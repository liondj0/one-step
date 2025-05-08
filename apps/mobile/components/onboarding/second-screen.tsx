import { Image, Text } from "react-native";

export default function SecondScreen() {
  return (
    <>
      <Text className="text-forest text-5xl font-libre tracking-tighter leading-[1.25] text-center w-6/8 mt-6">
        Group support
      </Text>
      <Image
        source={require("@/assets/images/onboarding/2.png")}
        className={`w-full my-0 my-[-4rem]`}
        style={{ objectFit: "contain" }}
      />
      <Text className="text-forest text-4xl font-libre tracking-tighter leading-[1.25] text-center w-6/8 mb-6">
        Stay consistent {"\n"} with your group.
      </Text>
      <Text className="text-forest font-medium text-2xl leading-[1.25] text-center w-3/5">
        Every step forward helps {"\n"} your team grow
      </Text>
    </>
  );
}
