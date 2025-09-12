import { BaseRepo } from "./base-repo";
import { GroupPostEntity } from "../entity/group-post-entity";

export class GroupPostRepo extends BaseRepo<GroupPostEntity> {
  constructor() {
    super(GroupPostEntity);
  }

  getPostsForGroupId(groupId: string) {
    return this.entityManager.find(GroupPostEntity, { group: { id: groupId } }, {orderBy: {createdAt: "DESC"}});
  }
}

export const groupPostRepo = () => new GroupPostRepo();
