import { Stack } from "expo-router";
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-soft"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="px-6"
      >
        <View className="flex-1 items-center justify-start bg-soft pt-24 px-6 min-h-[850px]">
          <Image
            source={require("@/assets/images/logo.png")}
            className={`h-36 mt-3`}
            style={{ objectFit: "contain" }}
          />
          <View className="w-full flex-1 bg-soft">
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
