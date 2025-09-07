import {BaseEntity} from "./base-entity";
import {UserEntity} from "./user-entity";
import {Entity, Enum, ManyToOne, type Rel} from "@mikro-orm/core";
import {GroupEntity} from "./group-entity";
import {UserInGroupStatus} from "../enum/user-in-group-status";
import {UserInGroupRole} from "../enum/user-in-group-role";

@Entity({ tableName: 'user_in_groups'})
export class UserInGroupEntity extends BaseEntity {


  constructor() {
    super();
  }

  @ManyToOne({entity: () => UserEntity, fieldName: 'userId'})
  user!: Rel<UserEntity>;

  @ManyToOne({entity: () => GroupEntity, fieldName: 'groupId'})
  group!: Rel<GroupEntity>;

  @Enum({items: () => UserInGroupStatus, nativeEnumName: 'user_in_group_status'})
  status!: UserInGroupStatus;

  @Enum({items: () => UserInGroupRole, nativeEnumName: 'user_in_group_role'})
  role!: UserInGroupRole;

}
