import {BaseRepo} from "./base-repo";
import {UserEntity} from "../entity/user-entity";


export class UserRepo extends BaseRepo<UserEntity>{


  constructor() {
    super(UserEntity);
  }

}


export const userRepo = () => new UserRepo();
