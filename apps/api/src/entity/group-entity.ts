import {BaseEntity} from "./base-entity";
import {Collection, Entity, OneToMany, Property} from "@mikro-orm/core";
import {UserInGroupEntity} from "./user-in-group-entity";


@Entity({tableName: 'groups'})
export class GroupEntity extends BaseEntity {

  constructor({usersInGroup, ...scalars}: Partial<GroupEntity> = {}) {
    super();
    Object.assign(this, scalars)
  }

  @Property()
  name!: string;

  @Property({default: ''})
  description!: string;

  @Property({default: false})
  isPublic!: boolean;

  @OneToMany({entity: () => UserInGroupEntity, mappedBy: 'group'})
  usersInGroup = new Collection<UserInGroupEntity>(this)

}
