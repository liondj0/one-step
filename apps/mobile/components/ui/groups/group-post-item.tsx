import { GroupPost } from "../../../../../packages/common/dto/post/group-post";
import { dateUtil } from "@one-step/common/util/date";
import { forwardRef, Ref } from "react";
import { Pressable, Text, View } from "react-native";
import { UserImage } from "@/components/ui/user-image";
import Reactions from "@/components/reactions";

type GroupPostItemProps = { post: GroupPost, groupId: string };

const GroupPostItem = ({ post, groupId }: GroupPostItemProps, ref: Ref<View>) => {
  return (
    <View style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 }, // lower vertical offset
      shadowOpacity: 0.15,                   // lighter than 0.25
      shadowRadius: 8,                       // softer blur
      elevation: 4,                          // harmless on iOS, needed if you also want Android
    }} className={`rounded-2xl p-4 bg-white mb-6`}>
      <Pressable ref={ref}>
        <View className="flex flex-row items-center">
          <UserImage user={post.user} className={``} />
          <View className={`ml-4`}>
            <Text className={`text-base text-ink`}>
              {post.user.firstName} {post.user.lastName}
            </Text>
            <Text className={`text-md text-dustysky`}>
              {dateUtil.formatDistance(post.createdAt)}
            </Text>
          </View>
        </View>
        <Text className={`py-6`}>{post.message}</Text>
      </Pressable>
      <Reactions post={post} groupId={groupId} />
    </View>
  );
};

export default forwardRef(GroupPostItem);
