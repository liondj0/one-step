import {BaseRepo} from "./base-repo";
import {GroupPostEntity} from "../entity/group-post-entity";


export class GroupPostRepo extends BaseRepo<GroupPostEntity> {

  constructor() {
    super(GroupPostEntity);
  }


}


export const groupPostRepo = () => new GroupPostRepo();
