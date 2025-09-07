import {BaseRepo} from "./base-repo";
import {GroupEntity} from "../entity/group-entity";
import {getUserInSession} from "../util/session-util";


export class GroupRepo extends BaseRepo<GroupEntity> {
  constructor() {
    super(GroupEntity);
  }

  find() {
    return this.entityManager.find(GroupEntity, {usersInGroup: {user: {id: getUserInSession().id}}})
  }
}

export const groupRepo = () => new GroupRepo();
