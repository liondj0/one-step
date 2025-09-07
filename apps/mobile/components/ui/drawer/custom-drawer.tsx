import { Drawer } from "expo-router/drawer";
import {Pressable, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {CustomDrawerContent} from "@/components/ui/drawer/custom-drawer-content";


export const CustomDrawer = () => {
  return <Drawer
    drawerContent={(p) => <CustomDrawerContent {...p} />}
    screenOptions={({navigation}: {navigation: any}) => ({
      headerStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 140,
      },
      headerTitle: '',
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
            <Text className={`text-forest text-2xl font-semibold`}>One Step</Text>
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
          <View className={`bg-sunbeam rounded-full p-2`}>
            <Text>🙈</Text>
          </View>
        </Pressable>
      ),
    })}
  />
}
