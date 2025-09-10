import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateGroupDto,
  createGroupSchema,
} from "@one-step/common/dto/group/create-group-dto";
import FormInput from "@/components/ui/form/form-input";
import { Bullet } from "@/components/ui/bullet";
import { PublicPrivacyOption } from "@/components/ui/groups/group-privacy-options/public-privacy-option";
import { InvitePrivacyOption } from "@/components/ui/groups/group-privacy-options/invite-privacy-option";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/util/colors";

export default function NewGroup() {
  const headerHeight = useHeaderHeight();

  const form = useForm<CreateGroupDto>({
    resolver: zodResolver(createGroupSchema),
    mode: "onBlur",
  });

  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    console.log('called')
  });

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
              className={`flex flex-row pr-14 h-40 rounded-b-3xl overflow-hidden`}
            >
              <LinearGradient
                colors={["#FBB8B0", "#FFE9A7", "#A9D9D3"]}
                start={{ x: 0.2, y: -0.3 }}
                end={{ x: 0.9, y: 1.3 }}
                locations={[0, 0.35, 1]}
                style={StyleSheet.absoluteFill}
              />
              <Text className={`text-4xl absolute bottom-6 left-6 z-10`}>
                🌸
              </Text>
              <Text className={`text-4xl absolute right-5 top-11 z-10`}>
                ✨
              </Text>
              <View className={`flex flex-row items-center h-28 flex-1`}>
                <Pressable onPress={() => router.back()} className={`ml-9`}>
                  <MaterialCommunityIcons
                    name={"arrow-left"}
                    size={20}
                    color={colors.forest}
                  />
                </Pressable>
                <View className={`mx-auto`}>
                  <Text
                    className={`text-center text-2xl font-bold text-forest`}
                  >
                    Create group
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
                <Bullet className={`bg-sunbeam`} />
                Group name*
              </Text>
              <FormInput
                className="w-full bg-transparent border-dustysky/60 border py-4 px-6 rounded-xl text-ink font-normal placeholder:text-ink w-full"
                name="name"
                placeholder="Funny names are incouraged"
                maxLength={50}
              />
              {/*<Text*/}
              {/*  className={`text-center text-sm font-normal flex-1 text-dustysky mt-2 ml-2`}*/}
              {/*>*/}
              {/*  {name?.length ?? 0}/50 Characters*/}
              {/*</Text>*/}
            </View>
            <View className={`flex flex-col items-start mt-7 px-6`}>
              <Text
                className={`text-center text-lg font-normal text-sm flex-1 text-ink font-semibold mb-2 flex items-center`}
              >
                <Bullet className={`bg-peach`} />
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
                <Bullet className={`bg-dustysky`} />
                Group privacy
              </Text>
              <Pressable
                className={`flex-1 w-full`}
                onPress={() => setIsPublic(true)}
              >
                <Text className={`${isPublic ? 'text-forest font-bold' : ''}`}>True</Text>
                {/*<PublicPrivacyOption isPublic={isPublic} />*/}
              </Pressable>
              <View className={`mt-4`} />
              <Pressable
                className={`flex-1 w-full`}
                onPress={() => setIsPublic(false)}
              >
                {/*<InvitePrivacyOption isPublic={!isPublic} />*/}
                <Text className={`${!isPublic ? 'text-forest font-bold' : ''}`}>False</Text>
              </Pressable>
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </View>
  );
}
