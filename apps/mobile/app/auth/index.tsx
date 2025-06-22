import { Pressable, Text, TextInput, View } from "react-native";
import { GoogleButton } from "@/components/auth/google-button";
import Button from "@/components/ui/button";
import { Link, useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const navigateToSignIn = () => {
    router.replace("/auth/sign-in");
  };
  return (
    <View className="flex-1 bg-soft flex-col items-center px-6">
      <Text className="heading text-center w-6/8 mt-6 mb-6">
        Create your account
      </Text>
      <GoogleButton></GoogleButton>
      <View className=" flex flex-row items-center bg-soft mt-6 w-full">
        <View className="h-[1px] flex-1 bg-grey"></View>
        <Text className="text-forest font-nunito font-semibold text-3xl text-center mx-4">
          or
        </Text>
        <View className="h-[1px] flex-1 bg-grey"></View>
      </View>
      <TextInput
        placeholder={"First name"}
        textContentType={`givenName`}
        className={`w-full mt-6 bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
      />
      <TextInput
        placeholder={"Last name"}
        textContentType={`familyName`}
        className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
      />
      <TextInput
        placeholder={"Email"}
        textContentType={`emailAddress`}
        className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
      />
      <TextInput
        secureTextEntry={true}
        placeholder={"Password"}
        textContentType={`password`}
        className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
      />
      <TextInput
        secureTextEntry={true}
        placeholder={"Repeat Password"}
        textContentType={`password`}
        className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
      />
      <Button onPress={() => {}} className={`w-full items-center rounded-2xl`}>
        Sign up
      </Button>
      <View className="flex flex-col items-center justify-center w-full">
        <Text className="text-forest font-nunito font-semibold text-center mt-8 text-xl leading-[1.125]">
          Already have an account?
        </Text>
        <Pressable onPress={navigateToSignIn}>
          <Text className="text-forest font-nunito font-bold text-center text-2xl underline">
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
