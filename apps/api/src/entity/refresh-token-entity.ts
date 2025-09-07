import { BaseEntity } from "./base-entity";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { UserEntity } from "./user-entity";

@Entity({ tableName: "refresh_tokens" })
export class RefreshTokenEntity extends BaseEntity {
  constructor(partial?: Partial<RefreshTokenEntity>) {
    super();
    if (partial) Object.assign(this, partial);
  }

  @Property({ unique: true })
  token!: string;

  @Property()
  expiresAt!: Date;

  @ManyToOne({ entity: () => UserEntity, fieldName: "userId" })
  user!: UserEntity;

  @Property({ type: "uuid" })
  userId!: string;
}
