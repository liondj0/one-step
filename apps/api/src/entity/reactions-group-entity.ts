import {Collection, Entity, OneToMany} from "@mikro-orm/core";
import {BaseEntity} from "./base-entity";
import {ReactionEntity} from "./reaction-entity";


@Entity({tableName: "reactions_groups"})
export class ReactionsGroupEntity extends BaseEntity {

  constructor(partial?: Partial<ReactionsGroupEntity>, ) {
    super();
    Object.assign(this, partial);
  }


  @OneToMany({entity: () => ReactionEntity, mappedBy: "reactionsGroup"})
  reactions = new Collection<ReactionEntity>(this);

}
