import {BaseRepo} from "./base-repo";
import {UserInGroupEntity} from "../entity/user-in-group-entity";


export class UserInGroupRepo extends BaseRepo<UserInGroupEntity> {
  constructor() {
    super(UserInGroupEntity);
  }
}

export const userInGroupRepo = () => new UserInGroupRepo();
