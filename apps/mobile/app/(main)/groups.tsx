import { Text, View, StyleSheet } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar";
import {useHeaderHeight} from "@react-navigation/elements";

export default function Groups() {
  const headerHeight = useHeaderHeight(); // to avoid content underlap

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <LinearGradient
        colors={["#FFB19933", "#FFF"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
      />
      <View style={{ flex: 1, paddingTop: headerHeight }}>
        <Text className="text-sunbeam font-bold text-xl text-center mt-8">
          Groups
        </Text>
      </View>
    </View>
  );
}
