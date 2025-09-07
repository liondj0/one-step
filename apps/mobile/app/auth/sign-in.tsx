import {KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, Image, View} from "react-native";
import { GoogleButton } from "@/components/auth/google-button";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  SignInData,
  signInDataSchema,
} from "@one-step/common/dto/auth/signin-data";
import FormInput from "@/components/ui/form/form-input";
import {authService} from "@/lib/service/auth-service";
import {useMutation} from "@tanstack/react-query";

export default function Signup() {
  const router = useRouter();

  const navigateToSignup = () => {
    router.replace("/auth");
  };

  const methods = useForm<SignInData>({
    resolver: zodResolver(signInDataSchema),
    mode: "onBlur",
  });

  const signIn = async (data: SignInData) => {
    try {
      await authService.signIn(data);
      router.replace("/(main)");
    } catch (e) {
      console.log({message: (e as any).message})
      console.log(e)
    }
  }

  const mutation = useMutation({ mutationFn: signIn });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // android: 'height' works well
      className="flex-1 bg-soft"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          <Image
            source={require("@/assets/images/logo.png")}
            className={`h-36 mt-36`}
            style={{ objectFit: "contain" }}
          />
          <Text className="heading text-center w-6/8 mt-6 mb-10">Welcome back!</Text>

          <GoogleButton />

          <View className="flex-row items-center bg-soft mt-6 w-full">
            <View className="h-[1px] flex-1 bg-grey" />
            <Text className="text-forest font-nunito font-semibold text-3xl text-center mx-4">or</Text>
            <View className="h-[1px] flex-1 bg-grey" />
          </View>

          <FormProvider {...methods}>
            <>
              <FormInput
                className="w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey mt-6"
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
              />
              <FormInput
                className="w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                autoComplete="password"
                returnKeyType="done"
              />
              <Button
                onPress={methods.handleSubmit((signInData) => mutation.mutate(signInData))}
                className="w-full items-center rounded-2xl"
              >
                Sign in
              </Button>
            </>
          </FormProvider>

          {/* spacer so the CTA/link isn't hidden behind keyboard/home indicator */}
          <View className="h-6" />

          <View className="items-center justify-center w-full">
            <Text className="text-forest font-nunito font-semibold text-center mt-8 text-xl leading-[1.125]">
              Don{"'"}t have an account?
            </Text>
            <Pressable onPress={navigateToSignup}>
              <Text className="text-forest font-nunito font-bold text-center text-2xl underline">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
