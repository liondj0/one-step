import { BaseEntity } from "./base-entity";
import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany, OneToOne,
  Property,
  type Rel,
} from "@mikro-orm/core";
import { GroupEntity } from "./group-entity";
import { UserEntity } from "./user-entity";
import { CommentEntity } from "./comment-entity";
import {ReactionsGroupEntity} from "./reactions-group-entity";

@Entity({ tableName: "group_posts"})
export class GroupPostEntity extends BaseEntity {
  @ManyToOne({ entity: () => GroupEntity, fieldName: "groupId" })
  group!: Rel<GroupEntity>;

  @ManyToOne({ entity: () => UserEntity, fieldName: "userId", eager: true })
  user!: Rel<UserEntity>;

  @Property({ type: "text" })
  message!: string;

  @OneToMany({ entity: () => CommentEntity, mappedBy: "post" })
  comments = new Collection<CommentEntity>(this);

  @OneToOne({ entity: () => ReactionsGroupEntity, eager: true, cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.REMOVE] })
  reactionsGroup!: Rel<ReactionsGroupEntity>;
}
