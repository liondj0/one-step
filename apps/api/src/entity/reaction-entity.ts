import { BaseEntity } from "./base-entity";
import {
  Entity,
  Enum,
  Formula,
  ManyToOne,
  type Rel,
  Unique,
} from "@mikro-orm/core";
import { UserEntity } from "./user-entity";
import { ReactionsGroupEntity } from "./reactions-group-entity";
import { Emoji } from "@one-step/common/enums/emoji";

@Entity({ tableName: "reactions" })
@Unique({ properties: ["emoji", "reactionsGroup", "user"] })
export class ReactionEntity extends BaseEntity {
  @Enum({ items: () => Emoji, nativeEnumName: "emoji" })
  emoji!: string;

  @ManyToOne({ entity: () => UserEntity, fieldName: "userId" })
  user!: UserEntity;

  @Formula((alias) => `${alias}."userId"`)
  userId!: string;

  @ManyToOne({
    entity: () => ReactionsGroupEntity,
    fieldName: "reactionsGroupId",
    eager: false,
  })
  reactionsGroup!: Rel<ReactionsGroupEntity>;
}
