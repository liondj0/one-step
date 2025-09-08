import { Stack } from "expo-router";
import { View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";

export default function AuthLayout() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <View className="flex-1 bg-soft">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{ animation: "fade", animationDuration: 200 }}
          />
          <Stack.Screen
            name="sign-in"
            options={{ animation: "fade", animationDuration: 200 }}
          />
        </Stack>
      </View>
    </FormProvider>
  );
}
