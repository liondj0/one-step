import { BaseEntity } from "./base-entity";
import { UserEntity } from "./user-entity";
import {
  Cascade,
  Entity,
  Enum,
  ManyToOne,
  type Rel,
  Unique,
} from "@mikro-orm/core";
import { GroupEntity } from "./group-entity";
import { UserInGroupStatus } from "../enum/user-in-group-status";
import { UserInGroupRole } from "../enum/user-in-group-role";

@Entity({ tableName: "user_in_groups" })
@Unique({ properties: ["user", "group"] })
export class UserInGroupEntity extends BaseEntity {
  constructor({ group, user, ...scalars }: Partial<UserInGroupEntity> = {}) {
    super();
    Object.assign(this, scalars);
  }

  @ManyToOne({
    entity: () => UserEntity,
    fieldName: "userId",
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.REMOVE],
  })
  user!: Rel<UserEntity>;

  @ManyToOne({
    entity: () => GroupEntity,
    fieldName: "groupId",
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.REMOVE],
  })
  group!: Rel<GroupEntity>;

  @Enum({
    items: () => UserInGroupStatus,
    nativeEnumName: "user_in_group_status",
  })
  status!: UserInGroupStatus;

  @Enum({ items: () => UserInGroupRole, nativeEnumName: "user_in_group_role" })
  role!: UserInGroupRole;
}
