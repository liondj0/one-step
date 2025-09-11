import { BaseRepo } from "./base-repo";
import { UserInGroupEntity } from "../entity/user-in-group-entity";
import { DeepPartial } from "../types/deep-partial";
import { FilterQuery, FindOneOptions } from "@mikro-orm/core";

export class UserInGroupRepo extends BaseRepo<UserInGroupEntity> {
  constructor() {
    super(UserInGroupEntity);
  }

  async findOne(params: DeepPartial<UserInGroupEntity>) {
    return this.entityManager.findOne(
      UserInGroupEntity,
      params as FilterQuery<UserInGroupEntity>,
      {
        populate: ["user", "group"],
      },
    ) as Promise<UserInGroupEntity | undefined>;
  }
}

export const userInGroupRepo = () => new UserInGroupRepo();
