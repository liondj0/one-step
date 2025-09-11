// app/(drawer)/_layout.tsx
import { CustomDrawerContent } from "@/components/ui/drawer/custom-drawer-content";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { useRoute } from "@react-navigation/native";
import { TwoLineTitle } from "@/components/ui/drawer/two-line-title";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function DrawerLayout() {
  const route = useRoute();

  return (
    <Drawer
      drawerContent={(p) => <CustomDrawerContent {...p} />}
      screenOptions={({ navigation }: { navigation: any }) => {
        return {
          headerStyle: {
            paddingTop: 20,
            paddingBottom: 20,
            height: 120,
          },

          headerTransparent: true,
          // Replace the header background with a blur + soft tint overlay
          headerBackground: () => (
            <View style={StyleSheet.absoluteFill}>
              <BlurView
                intensity={35} // 0–100; tweak to taste
                tint="light" // "light" | "dark" | "default"
                style={StyleSheet.absoluteFill}
              />
              {/* extra warmth: add a faint peach tint over the blur */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: "rgba(255,255,255,0.3)" }, // peach w/ alpha
                ]}
              />
            </View>
          ),
          headerShadowVisible: false,
          headerTitleStyle: { color: "#4f694c" },
          headerTintColor: "#4f694c",
          sceneContainerStyle: { backgroundColor: "transparent" },
          headerTitleAlign: "left",

          headerTitle: () => (
            <TwoLineTitle title={"One Step 🌱"} subTitle={`At a time`} />
          ),

          headerLeft: () => (
            <View className={`flex items-center flex-row`}>
              <Pressable
                onPress={() => navigation.toggleDrawer()}
                hitSlop={10}
                className={`pl-6`}
              >
                <MaterialCommunityIcons name="menu" size={24} color="#4f694c" />
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {}}
              style={{ paddingHorizontal: 12, marginRight: 6 }}
              hitSlop={10}
            >
              <View
                className={`bg-sunbeam rounded-full h-10 w-10 flex items-center justify-center`}
              >
                <Text className={`text-xl`}>🙈</Text>
              </View>
            </Pressable>
          ),
        };
      }}
    />
  );
}
