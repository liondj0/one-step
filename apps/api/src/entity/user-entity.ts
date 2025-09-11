import {Entity, Enum, HiddenProps, Property} from "@mikro-orm/core";
import { BaseEntity } from "./base-entity";
import { AuthType } from "../enum/auth-type";

@Entity({ tableName: "users" })
export class UserEntity extends BaseEntity {
  constructor(partial?: Partial<UserEntity>) {
    super();
    if (partial) Object.assign(this, partial);
  }

  @Property({ unique: true })
  email!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ nullable: true })
  profilePhotoUrl?: string;

  @Enum({ items: () => AuthType, nativeEnumName: "auth_type" })
  authType!: AuthType;

  @Property({ nullable: true, hidden: true })
  password?: string;
}
