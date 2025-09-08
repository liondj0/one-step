import { Drawer } from "expo-router/drawer";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomDrawerContent } from "@/components/ui/drawer/custom-drawer-content";
import { BlurView } from "expo-blur";

export const CustomDrawer = () => {
  return (
    <Drawer
      drawerContent={(p) => <CustomDrawerContent {...p} />}
      screenOptions={({ navigation }: { navigation: any }) => ({
        headerStyle: {
          paddingTop: 20,
          paddingBottom: 20,
          height: 140,
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
                { backgroundColor: "rgba(255,177,153,0.1)" }, // peach w/ alpha
              ]}
            />
          </View>
        ),
        headerShadowVisible: false,
        headerTitleStyle: { color: "#4f694c" },
        headerTintColor: "#4f694c",
        sceneContainerStyle: { backgroundColor: "transparent" },

        headerTitle: "",
        headerLeft: () => (
          <View className={`flex items-center flex-row`}>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{ paddingHorizontal: 12 }}
              hitSlop={10}
            >
              <MaterialCommunityIcons name="menu" size={24} color="#4f694c" />
            </Pressable>
            <View className={`ml-4`}>
              <Text className={`text-forest text-2xl font-semibold`}>
                One Step
              </Text>
              <Text className={`text-forest text-xl`}>One step at a time</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => {}}
            style={{ paddingHorizontal: 12, marginRight: 6 }}
            hitSlop={10}
          >
            <View
              className={`bg-sunbeam rounded-full h-12 w-12 flex items-center justify-center`}
            >
              <Text className={`text-2xl`}>🙈</Text>
            </View>
          </Pressable>
        ),
      })}
    />
  );
};
