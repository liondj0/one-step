import {forwardRef, Ref, useEffect, useState} from "react";
import {Pressable, ScrollView, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/util/colors";
import {Emoji} from "@one-step/common/enums/emoji";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {groupPostApi} from "@/lib/api/group-post-api";
import {ReactionsGroup} from "@one-step/common/dto/reactions/reactions-group";
import {GroupPost} from "@one-step/common/dto/post/group-post";
import {useSession} from "@/lib/useSession";

const Modal = ({onEmojiSelect, excluded}: {onEmojiSelect: (emoji: Emoji) => void, excluded: Emoji[]}) => {
  return  <View className={`rounded-3xl h-14 px-3 bg-white border border-dustysky flex flex-row items-center absolute z-20 w-full top-[-56] h-10 overflow-hidden`}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className={`w-full flex items-center flex-row gap-3`}>
          {Object.values(Emoji).filter(e => !excluded.includes(e)).map(emoji => (<Pressable key={emoji} className={``} onPress={() => onEmojiSelect(emoji)}><Text className={`text-2xl`}>{emoji}</Text></Pressable>))}
        </View>
    </ScrollView>
  </View>
}

const Reactions = ({post, groupId}: { post: GroupPost, groupId: string }, ref: Ref<View>) => {
  const queryClient = useQueryClient();
  const session = useSession()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reactionsGroup, setReactionsGroup] = useState<ReactionsGroup>(post.reactionsGroup);
  const [usersReactions, setUsersReactions] = useState<Map<Emoji, string>>(new Map());


  useEffect(() => {
    if (!session.user?.id) return;

    const next = new Map<Emoji, string>();
    for (const r of reactionsGroup.reactions) {
      if (r.userId === session.user?.id) next.set(r.emoji, r.id);
    }

    let changed = next.size !== usersReactions.size;
    if (!changed) {
      for (const [k, v] of next) {
        if (usersReactions.get(k) !== v) { changed = true; break; }
      }
    }
    if (changed) setUsersReactions(next);
  }, [session, reactionsGroup]);



  const addReaction = async (emoji: Emoji) => {
    const result = await groupPostApi.addReaction(post.id, {emoji, reactionGroupId: post.reactionsGroup.id});
    setReactionsGroup(result);
  }

  const removeReaction = async (reactionId: string) => {
    const result = await groupPostApi.removeReaction(post.id, reactionId);
    setReactionsGroup(result);
  }

  const removeReactionMutation = useMutation({
    mutationFn: removeReaction,
    onSuccess: async () => {
      setIsModalOpen(false);
      await queryClient.invalidateQueries({queryKey:  ["posts", groupId ]})
    }
  })

  const addReactionMutation = useMutation({
    mutationFn: addReaction,
    onSuccess: async () => {
      setIsModalOpen(false);
      await queryClient.invalidateQueries({queryKey:  ["posts", groupId ]})
    }
  })

  const onReactionPress = (emoji: Emoji) => {
    const reactionId = usersReactions.get(emoji);
    if(reactionId) {
      removeReactionMutation.mutate(reactionId);
    } else {
      addReactionMutation.mutate(emoji);
    }
  }

  return <View ref={ref} className={`flex flex-row gap-2 flex-wrap flex-1`}>
    {isModalOpen && <Modal onEmojiSelect={emoji => addReactionMutation.mutate(emoji)} excluded={[...usersReactions.keys()]} />}
    {(reactionsGroup.countPerEmoji ?? []).map(({emoji, count}) => (
      <Pressable key={emoji} onPress={() => onReactionPress(emoji)} className={`flex h-8 flex-row items-center justify-center badge border-sunbeam self-start ${usersReactions.has(emoji) && 'bg-sunbeam/30'}`}>
        <Text className={`text-base text-dustysky`}>{emoji} {count}</Text>
      </Pressable>
    ))}
    <Pressable onPress={() => setIsModalOpen(!isModalOpen)} className={`flex h-8 flex-row items-center justify-center badge border-dustysky self-start`}>
      <MaterialCommunityIcons name={"plus"} size={22} color={colors.dustysky}  />
      <MaterialCommunityIcons name={"emoticon-happy-outline"} size={22} color={colors.dustysky}  />
    </Pressable>
  </View>;
}

export default forwardRef(Reactions);
