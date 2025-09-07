import { Pressable, Text, View } from "react-native";
import { GoogleButton } from "@/components/auth/google-button";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  SignupData,
  signupDataSchema,
} from "@one-step/common/dto/auth/signup-data";
import { z } from "zod";
import FormInput from "@/components/ui/form/form-input";
import { useMutation } from "@tanstack/react-query";
import {authService} from "@/lib/service/auth-service";

const signupWithConfirmSchema = signupDataSchema
  .extend({
    confirmPassword: z.string().min(8, "Min 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export default function Signup() {
  const router = useRouter();

  const navigateToSignIn = () => {
    router.replace("/auth/sign-in");
  };

  const methods = useForm<SignupData & { confirmPassword: string }>({
    resolver: zodResolver(signupWithConfirmSchema),
    mode: "onBlur",
  });

  const signup = async (data: SignupData) => {
    try {
      await authService.signup(data);
      router.replace("/(main)");
    } catch (e) {
      console.log(e);
    }
  };

  const mutation = useMutation({ mutationFn: signup });

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
      <FormProvider {...methods}>
        <>
          <FormInput
            className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey mt-6`}
            name="firstName"
            placeholder="First name"
          />
          <FormInput
            className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
            name="lastName"
            placeholder="First name"
          />
          <FormInput
            className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
          />
          <FormInput
            className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
            name="password"
            placeholder="Password"
          />
          <FormInput
            className={`w-full bg-transparent border-grey border py-4 px-6 rounded-xl mb-5 placeholder:text-grey`}
            name="confirmPassword"
            placeholder="Repeat password"
          />
          <Button
            onPress={methods.handleSubmit(
              ({ confirmPassword, ...signupData }) =>
                mutation.mutate(signupData),
            )}
            className={`w-full items-center rounded-2xl`}
          >
            Sign up
          </Button>
        </>
      </FormProvider>
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
