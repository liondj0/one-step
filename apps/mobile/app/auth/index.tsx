import { Text, TextInput, View } from "react-native";
import { GoogleButton } from "@/components/auth/google-button";
import Button from "@/components/ui/button";
import {Link} from "expo-router";

export default function Signup() {
  return (
    <View className="flex-1 bg-soft flex-col items-center px-6">
      <Text className="heading text-center w-6/8 mt-6 mb-12">
        Create your account
      </Text>
      <GoogleButton></GoogleButton>
      <View className=" flex flex-row items-center bg-soft mt-8 w-full">
        <View className="h-[1px] flex-1 bg-grey"></View>
        <Text className="text-forest font-nunito font-semibold text-3xl text-center mx-4">
          or
        </Text>
        <View className="h-[1px] flex-1 bg-grey"></View>
      </View>
      <TextInput
        placeholder={"Email"}
        textContentType={`emailAddress`}
        className={`w-full mt-8 bg-transparent border-grey border py-4 px-8 rounded-xl mb-6`}
      />
      <TextInput
        placeholder={"Password"}
        textContentType={`password`}
        className={`w-full bg-transparent border-grey border py-4 px-8 rounded-xl mb-6`}
      />
      <TextInput
        placeholder={"Repeat Password"}
        textContentType={`password`}
        className={`w-full bg-transparent border-grey border py-4 px-8 rounded-xl mb-6`}
      />
      <Button onPress={() => {}} className={`w-full items-center rounded-2xl`}>Sign up</Button>
      <Text className="text-forest font-nunito font-semibold text-center mt-8 text-xl mb-12">
        Already have an account?{"\n"}
        <Link href={'/auth'} className="text-forest font-nunito font-bold text-center mt-8 border-b underline">
          Sign in
        </Link>
      </Text>
    </View>
  );
}
