import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { dailyDashboardService } from "@/lib/service/daily-dashboard-service";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import Button from "@/components/ui/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/util/colors";
import MealLogItem from "@/components/ui/daily-dashboard/meal-log-item";
import SideQuestItem from "@/components/ui/daily-dashboard/side-quest-item";

export default function Main() {
  const headerHeight = useHeaderHeight();

  const { refetch, data, isFetching } = useQuery({
    queryKey: ["daily-dash"],
    queryFn: dailyDashboardService.getTodaysDashboard,
  });

  const firstTimeRef = React.useRef(true);
  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );

  const [mainFocus, setMainFocus] = useState("");

  const saveFocus = async () => {
    if (!data?.id) return;
    await dailyDashboardService.saveDailyActivity(data.id, {
      dailyGoal: mainFocus,
    });
    await refetch();
  };

  const markMainFocusAsComplete = async () => {
    if (!data?.id || !data.dailyGoal || data.dailyGoalCompleted) return;
    await dailyDashboardService.saveDailyActivity(data.id, {
      dailyGoalCompleted: true,
    });
    await refetch();
  };

  const updateMealLog = async (index: number) => {
    if (!data?.id || !data.meals || data.meals[index].ateAt) return;
    data.meals[index].ateAt = new Date();
    await dailyDashboardService.saveDailyActivity(data.id, {meals: data.meals});
    await refetch();
  }

  return (
    <ScrollView
      style={{ paddingTop: headerHeight }}
      className={`px-6 pb-6 flex`}
    >
      <View className={`my-8`}>
        <Text className="text-forest text-center text-3xl">Daily Dash ☀️</Text>
      </View>
      <View className="w-full bg-forest p-6 rounded-2xl overflow-hidden">
        <LinearGradient
          colors={[colors.sunbeam, colors.peach]}
          start={{ x: 0.3, y: 0.3 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.75]}
          style={StyleSheet.absoluteFill}
        />
        <Text className={`text-2xl mb-2`}>
          Today{"'"}s focus
        </Text>
        <Text numberOfLines={2} className={`text-lg`}>
          {data?.dailyGoal
            ? data.dailyGoal
            : "What's your main focus for today?"}
        </Text>
        {!data?.dailyGoal && (
          <>
            <TextInput
              onChangeText={setMainFocus}
              className={`input !border-0 !rounded-xl mt-8 placeholder:text-dustysky`}
              placeholder={`e.g., Take a 30-minute walk`}
            ></TextInput>
            <Button
              disabled={isFetching}
              onPress={saveFocus}
              className={`mt-6 flex justify-center flex-row !rounded-xl items-center bg-white ${isFetching ? "opacity-30" : ""}`}
              textClassName={`text-xl`}
            >
              <MaterialCommunityIcons
                name={"floppy"}
                color={colors.forest}
                size={18}
                className={`px-4`}
              />
              {"  "}Save Focus
            </Button>
          </>
        )}
        {data?.dailyGoal && (
          <Button
            disabled={data.dailyGoalCompleted}
            className={`mt-4 rounded-xl flex flex-row items-center justify-center ${data?.dailyGoalCompleted ? "bg-forest" : "bg-white"}`}
            textClassName={`text-lg ${data?.dailyGoalCompleted ? "text-white" : "text-forest" }`}
            onPress={markMainFocusAsComplete}
          >
            {!data.dailyGoalCompleted && (
              <MaterialCommunityIcons
                name={"circle-outline"}
                color={colors.forest}
                size={18}
              />
            )}
            {data.dailyGoalCompleted && (
              <MaterialCommunityIcons
                name={"check-circle-outline"}
                color={`#FFF`}
                size={18}
              />
            )}

            {"  "}
            {data?.dailyGoalCompleted
              ? "Completed! Great job!  🎉"
              : "Mark as complete"}
          </Button>
        )}
      </View>
      <View className={`mt-8`}>
        <View>
          <Text className={`text-forest text-xl`}>Meal Check-ins 🍽️</Text>
        </View>
        <View className={`flex flex-row gap-4 mt-4`}>
          {data?.meals?.map((meal, index) => (<MealLogItem key={index} item={meal} onPress={() => updateMealLog(index)} />))}
        </View>
      </View>
      <View className={`mt-8`}>
        <View className={`mb-4`}>
          <Text className={`text-forest text-xl`}>Today{"'"}s Routine ✨</Text>
        </View>
        <View className={`bg-white flex-1 rounded-2xl p-6`}>
          <View className={`flex flex-row items-center mb-2 p-3`}>
            <View className={`border border-forest rounded-lg h-8 w-8 flex items-center justify-center`}>

            </View>
            <Text className={`ml-4 text-lg`}>🧘Morning meditation</Text>
          </View>
          <SideQuestItem onPress={() => {}} item={{label: "💧Drink water"}} />
        </View>
      </View>
    </ScrollView>
  );
}
