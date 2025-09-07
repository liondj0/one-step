import {BaseRepo} from "./base-repo";
import {GroupEntity} from "../entity/group-entity";


export class GroupRepo extends BaseRepo<GroupEntity> {
  constructor() {
    super(GroupEntity);
  }
}

export const groupRepo = () => new GroupRepo();
