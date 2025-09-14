import { Entity, ManyToOne, Property, type Rel } from "@mikro-orm/core";
import { BaseEntity } from "./base-entity";
import { GroupPostEntity } from "./group-post-entity";
import { UserEntity } from "./user-entity";

@Entity({ tableName: "comments" })
export class CommentEntity extends BaseEntity {
  @ManyToOne({ entity: () => GroupPostEntity, fieldName: "postId" })
  post!: Rel<GroupPostEntity>;

  @ManyToOne({ entity: () => UserEntity, fieldName: "userId" })
  user!: Rel<UserEntity>;

  @Property({ type: "text" })
  message!: string;
}
