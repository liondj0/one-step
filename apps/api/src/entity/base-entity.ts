import { PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

export class BaseEntity {
  @PrimaryKey({ type: "uuid" })
  id = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
