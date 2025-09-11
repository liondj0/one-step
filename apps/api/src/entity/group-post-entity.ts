import {BaseEntity} from "./base-entity";
import {Collection, Entity, ManyToOne, OneToMany, Property, type Rel} from "@mikro-orm/core";
import {GroupEntity} from "./group-entity";
import {UserEntity} from "./user-entity";
import {CommentEntity} from "./comment-entity";

@Entity()
export class GroupPostEntity extends BaseEntity {

  @ManyToOne({entity: () => GroupEntity, fieldName: 'groupId'})
  group!: Rel<GroupEntity>;

  @ManyToOne({entity: () => UserEntity, fieldName: 'userId', eager: true})
  user!: Rel<UserEntity>;

  @Property({ type: 'text'})
  message!: string;

  @OneToMany({entity: () => CommentEntity, mappedBy: 'post'})
  comments = new Collection<CommentEntity>(this);
}
