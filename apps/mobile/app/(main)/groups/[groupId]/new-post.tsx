import {Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import { MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/util/colors";
import {router, useLocalSearchParams} from "expo-router";
import {useHeaderHeight} from "@react-navigation/elements";
import {useMutation, useQuery} from "@tanstack/react-query";
import {groupApi} from "@/lib/api/group-api";
import {useSession} from "@/lib/useSession";
import {UserImage} from "@/components/ui/user-image";
import {useState} from "react";
import {groupPostApi} from "@/lib/api/group-post-api";


export default function NewPost() {

  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const headerHeight = useHeaderHeight();

  const {user, isSessionReady} = useSession()

  const query = useQuery({
    queryKey: ["group-for-post", groupId],
    queryFn: async () => {
      const group = await groupApi.getGroupById(groupId);
      if (!group) router.back();
      return group;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await groupPostApi.saveNewPost({message, groupId});
      router.back();
    }
  })

  const [message, setMessage] = useState<string>("");

  return <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()} >
    <View style={{flex: 1, paddingTop: headerHeight}} className={`bg-paper`}>
      <View className={`px-6 pt-6 pb-10 flex flex-col flex-1`}>
        <View className={`flex flex-row items-center mb-8`}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name={"arrow-left"} size={24} color={colors.forest} />
          </Pressable>
          <View className={`ml-4`}>
            <Text className={`text-xl font-medium text-forest`}>New Post</Text>
            <Text className={`text-sm text-forest`}>{query.data?.name}</Text>
          </View>
          <Pressable disabled={message.length < 10} onPress={() => mutation.mutate()} className={`rounded-3xl bg-forest flex flex-row px-6 py-1 ml-auto ${message.length > 10 ? '' : 'opacity-50'}`}>
            <MaterialCommunityIcons name={"send"} size={20} color={colors.paper} className={`mr-2 my-auto`} />
            <Text className={`text-paper text-xl font-medium`}>Post</Text>
          </Pressable>
        </View>
        <View className={`bg-white flex-1 shadow-2xl shadow-black rounded-2xl py-8 px-6 flex`}>
          <View className={`flex flex-row items-center mb-4`}>
            {isSessionReady && <UserImage user={user!} className={`h-14 w-14`} textClassName={'!text-2xl'} />}
            <View className={`ml-4`}>
              <Text className={`text-xl`}>You</Text>
              <Text className={`text-base text-dustysky`}>
                <MaterialCommunityIcons name={'lock-outline'} color={colors.dustysky} size={14} />
                Group only
              </Text>
            </View>
          </View>
          <TextInput onChangeText={setMessage} onBlur={() => Keyboard.dismiss()} className={`w-full h-52 placeholder:text-dustysky text-forest text-lg`} multiline={true} placeholder={`How was your step today? Share your progress, challenges, or victories...`} />
          <View className={`flex flex-row justify-end`}>
            <Text className={`text-sm text-dustysky`}>{message.length}/500</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
}
