import {Cascade, Collection, Entity, Formula, OneToMany} from "@mikro-orm/core";
import {BaseEntity} from "./base-entity";
import {ReactionEntity} from "./reaction-entity";


@Entity({tableName: "reactions_groups"})
export class ReactionsGroupEntity extends BaseEntity {

  constructor(partial?: Partial<ReactionsGroupEntity>, ) {
    super();
    Object.assign(this, partial);
  }


  @OneToMany({entity: () => ReactionEntity, mappedBy: "reactionsGroup", eager: true, cascade: [Cascade.ALL]})
  reactions = new Collection<ReactionEntity>(this);

  @Formula(
    (alias) =>
      `(select array_agg(jsonb_build_object('emoji', emoji, 'count', "count")) from (select count(*), r."emoji" from reactions r where r."reactionsGroupId" = ${alias}.id group by r."emoji") counts)`,
  )
  countPerEmoji?: {emoji: string, count: number}[]
}
