import { GroupPost } from "@one-step/common/dto/group/group-post";
import { dateUtil } from "@one-step/common/util/date";
import { forwardRef, Ref } from "react";
import { Pressable, Text, View } from "react-native";
import { UserImage } from "@/components/ui/user-image";

type GroupPostItemProps = { post: GroupPost };

const GroupPostItem = ({ post }: GroupPostItemProps, ref: Ref<View>) => {
  return (
    <View className={`rounded-2xl shadow-lg p-4 bg-white mb-6`}>
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
    </View>
  );
};

export default forwardRef(GroupPostItem);
