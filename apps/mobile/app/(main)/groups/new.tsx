import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateGroupDto,
  createGroupSchema,
} from "@one-step/common/dto/group/create-group-dto";
import FormInput from "@/components/ui/form/form-input";
import { Bullet } from "@/components/ui/bullet";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/util/colors";
import GroupPrivacyOption from "@/components/ui/groups/group-privacy-options/group-privacy-option";
import Button from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { groupApi } from "@/lib/api/group-api";

export default function NewGroup() {
  const headerHeight = useHeaderHeight();

  const form = useForm<CreateGroupDto>({
    resolver: zodResolver(createGroupSchema),
    mode: "onBlur",
    defaultValues: {
      isPublic: true,
    },
  });

  const name = useWatch({ control: form.control, name: "name" });
  const isPublic = useWatch({ control: form.control, name: "isPublic" });

  const setIsPublic = (value: boolean) => {
    form.setValue("isPublic", value);
  };

  const mutation = useMutation({
    mutationFn: async (data: CreateGroupDto) => {
      await groupApi.saveGroup(data);
      router.back();
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    mutation.mutate(data);
  })

  return (
    <View style={{ flex: 1 }} className={``}>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <FormProvider {...form}>
          <View className={`relative`}>
            <View
              className={`flex flex-row pr-14 h-44 rounded-b-3xl overflow-hidden`}
            >
              <LinearGradient
                colors={["#FFE9A7AA", "#FBB8B0AA", "#7DA2A9AA"]}
                start={{ x: 0.4, y: -0.5 }}
                end={{ x: 0.9, y: 1.3 }}
                locations={[0, 0.45, 1]}
                style={StyleSheet.absoluteFill}
              />
              <Text className={`text-4xl absolute bottom-6 left-6 z-10`}>
                🌸
              </Text>
              <Text className={`text-4xl absolute right-5 top-11 z-10`}>
                ✨
              </Text>
              <View className={`flex flex-row items-center h-32 flex-1`}>
                <Pressable onPress={() => router.back()} className={`ml-9`}>
                  <MaterialCommunityIcons
                    name={"arrow-left"}
                    size={20}
                    color={colors.forest}
                  />
                </Pressable>
                <View className={`mx-auto`}>
                  <Text className={`text-center text-2xl text-forest mb-2`}>
                    Create group 🌱
                  </Text>
                  <Text
                    className={`text-center text-sm font-normal text-forest`}
                  >
                    Bring people together around shared {"\n"} goals
                  </Text>
                </View>
              </View>
            </View>
            <View className={`flex flex-col items-start mt-8 px-6`}>
              <Text
                className={`text-center text-lg font-normal text-sm flex-1 text-ink font-semibold mb-2 flex items-center`}
              >
                <Bullet className={`bg-sunbeam mr-2`} />
                Group name*
              </Text>
              <FormInput
                className="w-full bg-transparent border-dustysky/60 border py-4 px-6 rounded-xl text-ink font-normal placeholder:text-ink w-full"
                name="name"
                placeholder="Funny names are incouraged"
                maxLength={50}
              />
              <Text
                className={`text-center text-sm font-normal flex-1 text-dustysky mt-2 ml-2`}
              >
                {name?.length ?? 0}/50 Characters
              </Text>
            </View>
            <View className={`flex flex-col items-start mt-7 px-6`}>
              <Text
                className={`text-center text-lg font-normal text-sm flex-1 text-ink font-semibold mb-2 flex items-center`}
              >
                <Bullet className={`bg-peach mr-2`} />
                Description
              </Text>
              <FormInput
                className="h-40 w-full bg-transparent border-dustysky/60 border py-4 px-6 rounded-xl text-ink font-normal placeholder:text-ink w-full"
                name="description"
                placeholder="What's this group about? What goals or habits will you support each other with?"
                multiline={true}
              />
            </View>
            <View className={`flex flex-col items-start mt-7 px-6`}>
              <Text
                className={`text-center text-lg font-normal text-sm flex-1 text-ink font-semibold mb-2 flex items-center`}
              >
                <Bullet className={`bg-dustysky mr-2`} />
                Group privacy
              </Text>
              <Pressable
                className={`flex-1 w-full`}
                onPress={() => setIsPublic(true)}
              >
                <GroupPrivacyOption
                  selected={!!isPublic}
                  title={`Open`}
                  subTitle={`Anyone can find and join`}
                >
                  <MaterialCommunityIcons
                    name={`web`}
                    size={20}
                    color={`#973c00`}
                  />
                </GroupPrivacyOption>
              </Pressable>
              <View className={`mt-4`} />
              <Pressable
                className={`flex-1 w-full`}
                onPress={() => setIsPublic(false)}
              >
                <GroupPrivacyOption
                  selected={!isPublic}
                  title={`Invite only`}
                  subTitle={`Anyone can find and join`}
                >
                  <MaterialCommunityIcons
                    name={`lock-outline`}
                    size={20}
                    color={`#9f2d00`}
                  />
                </GroupPrivacyOption>
              </Pressable>
            </View>
            <View className={`px-6 mt-8`}>
              <Button
                disabled={!form.formState.isValid}
                className={`${form.formState.isValid ? `` : `opacity-30`} bg-forest items-center`}
                textClassName={`text-white text-lg`}
                onPress={handleSubmit}
              >
                Create group 🌱
              </Button>
            </View>
            <View
              className={`mx-6 mt-8 flex flex-col p-6 rounded-2xl overflow-hidden`}
            >
              <LinearGradient
                colors={["#FFE9A7CA", "#FBB8B0CA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 1]}
                style={StyleSheet.absoluteFill}
              />
              <Text className={`text-ink text-2xl mb-4`}>☀️Pro tip</Text>
              <Text className={`text-dustysky text-lg`}>
                Groups work best when they{"'"}re focused around a habit or
                goal. Keep it simple and welcoming!
              </Text>
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </View>
  );
}
