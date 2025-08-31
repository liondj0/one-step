import { Stack } from "expo-router";
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {FormProvider, useForm} from "react-hook-form";

export default function AuthLayout() {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 bg-soft"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          <View className="flex-1 items-center justify-start bg-soft pt-20 px-2 min-h-[850px]">
            <Image
              source={require("@/assets/images/logo.png")}
              className={`h-36 mt-3`}
              style={{ objectFit: "contain" }}
            />
            <View className="w-full flex-1 bg-soft">
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name={"index"}
                  options={{ animation: "fade", animationDuration: 200 }}
                />
                <Stack.Screen
                  name={"sign-in"}
                  options={{ animation: "fade", animationDuration: 200 }}
                />
              </Stack>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
