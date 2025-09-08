import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import {View, Text, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useSession} from "@/lib/useSession";
import {authService} from "@/lib/service/auth-service";
import {Href, router} from "expo-router";
import {colors} from "@/util/colors";



export const CustomDrawerContent = (props: DrawerContentComponentProps)=> {


  const signOut = async () => {
    await authService.signOut();
    router.navigate("/auth/sign-in");
  }

  const go = async (href: Href) => {
    router.navigate(href);
    props.navigation.closeDrawer();
  }


  const {user} = useSession();
    return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: colors.paper, flex: 1 }}
    >
      <View className={`flex flex-1 mb-4`}>
        <View className={`ml-4 flex flex-row items-center`}>
          <View className={`h-12 w-12 rounded-full bg-sunbeam/30 flex items-center justify-center`}>
            <MaterialCommunityIcons name={"account-outline"} size={28}></MaterialCommunityIcons>
          </View>
          <Text>Hi, {user?.firstName} 👋</Text>
        </View>
        <View className={`mt-20 ml-4`}>
          <Pressable onPress={() => go("/")}>
            <View className={`flex flex-row mb-8 items-center`}>
              <View className={`h-14 w-14 bg-sunbeam/30 flex items-center justify-center rounded-lg mr-4`}>
                <MaterialCommunityIcons name={`bullseye`} color={colors.forest} size={28}></MaterialCommunityIcons>
              </View>
              <View>
                <Text className={`text-forest text-2xl`}>My Goals</Text>
                <Text className={`text-forest/50 text-md`}>Track your progress</Text>
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => go("/groups")}>
          <View className={`flex flex-row mb-8 items-center`}>
            <View className={`h-14 w-14 bg-sunbeam/30 flex items-center justify-center rounded-lg mr-4`}>
              <MaterialCommunityIcons name={`account-group`} color={colors.forest} size={28}></MaterialCommunityIcons>
            </View>
            <View>
              <Text className={`text-forest text-2xl`}>Groups</Text>
              <Text className={`text-forest/50 text-md`}>Connect with others</Text>
            </View>
          </View>
          </Pressable>
          <Pressable onPress={() => go("/health")}>
          <View className={`flex flex-row mb-8 items-center`}>
            <View className={`h-14 w-14 bg-sunbeam/30 flex items-center justify-center rounded-lg mr-4`}>
              <MaterialCommunityIcons name={`heart-outline`} color={colors.forest} size={28}></MaterialCommunityIcons>
            </View>
            <View>
              <Text className={`text-forest text-2xl`}>Wellness</Text>
              <Text className={`text-forest/50 text-md`}>Mind & body care</Text>
            </View>
          </View>
          </Pressable>
          <Pressable onPress={() => go("/settings")}>
          <View className={`flex flex-row mb-8 items-center`}>
            <View className={`h-14 w-14 bg-sunbeam/30 flex items-center justify-center rounded-lg mr-4`}>
              <MaterialCommunityIcons name={`cog-outline`} color={colors.forest} size={28}></MaterialCommunityIcons>
            </View>
            <View>
              <Text className={`text-forest text-2xl`}>App preferences</Text>
              <Text className={`text-forest/50 text-md`}>Make it your own</Text>
            </View>
          </View>
          </Pressable>
        </View>
        <View className={`mt-auto border-t border-t-peach/30 pt-12`}>
          <Pressable onPress={signOut}>
            <View className={`flex flex-row mb-8 items-center`}>
              <View className={`h-14 w-14 bg-sunbeam/30 flex items-center justify-center rounded-lg mr-4`}>
                <MaterialCommunityIcons name={`logout`} color={colors.danger} size={28}></MaterialCommunityIcons>
              </View>
              <View>
                <Text className={`text-danger text-2xl`}>Sign out</Text>
                <Text className={`text-danger/50 text-md`}>Hope to see you soon</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
