import { BaseRepo } from "./base-repo";
import { GroupEntity } from "../entity/group-entity";

export class GroupRepo extends BaseRepo<GroupEntity> {
  constructor() {
    super(GroupEntity);
  }

  find(filter: { userId: string }) {
    return this.entityManager.find(GroupEntity, {
      usersInGroup: { user: { id: filter.userId } },
    });
  }
}

export const groupRepo = () => new GroupRepo();
