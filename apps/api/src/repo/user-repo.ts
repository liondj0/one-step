import {BaseRepo} from "./base-repo";
import {User} from "@repo/common/src/models/user";
import {users} from "../db/schema";


class UserRepo extends BaseRepo<User, typeof users> {
  constructor() {
    super(users);
  }
}
