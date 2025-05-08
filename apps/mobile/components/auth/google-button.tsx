import { Image, Pressable, Text, View } from "react-native";

export function GoogleButton() {
  return (
    <Pressable className={`w-full`}>
      <View className="bg-white border-grey border py-4 px-8 rounded-xl flex flex-row items-center justify-center space-x-4 w-full flex">
        <Image
          source={require("@/assets/images/icons/google.png")}
          className={`h-8 w-8 object-contain mr-4`}
        />
        <Text
          className={`text-forest font-nunito font-bold text-2xl tracking-tight`}
        >
          Continue with Google
        </Text>
      </View>
    </Pressable>
  );
}
