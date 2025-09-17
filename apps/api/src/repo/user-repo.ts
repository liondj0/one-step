import { BaseRepo } from "./base-repo";
import { UserEntity } from "../entity/user-entity";

export class UserRepo extends BaseRepo<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findOneWithPassword(
    filter: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return (
      (await this.entityManager.findOne(UserEntity, filter, {
        populate: ["password"],
      })) ?? undefined
    );
  }
}

export const userRepo = () => new UserRepo();
