import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { ReactNode } from "react";
import { TwoLineTitle } from "@/components/ui/drawer/two-line-title";
import { Pressable, View, Text } from "react-native";

const toFn = (n?: ReactNode | (() => ReactNode)) =>
  !n ? undefined : typeof n === "function" ? (n as any) : () => n;

const DEFAULTS = {
  title: () => <TwoLineTitle title="One Step 🌱" subTitle="At a time" />,
  right: () => (
    <Pressable style={{ paddingHorizontal: 12, marginRight: 6 }} hitSlop={10}>
      <View className="bg-sunbeam rounded-full h-10 w-10 items-center justify-center">
        <Text className="text-xl">🙈</Text>
      </View>
    </Pressable>
  ),
};

export function useHeaderAction(
  nav: any,
  nodes: {
    title?: ReactNode | string;
    right?: ReactNode | (() => ReactNode);
  },
) {
  useFocusEffect(
    useCallback(() => {
      nav.setOptions({
        headerTitle:
          typeof nodes.title === "string" ? nodes.title : toFn(nodes.title),
        headerRight: toFn(nodes.right),
      });
      return () =>
        nav.setOptions({
          headerTitle: DEFAULTS.title,
          headerRight: DEFAULTS.right,
        });
    }, [nav, nodes.title, nodes.right]),
  );
}
