import {BaseRepo} from "./base-repo";
import {ReactionEntity} from "../entity/reaction-entity";
import {DeepPartial} from "../types/deep-partial";
import {FilterQuery} from "@mikro-orm/core";
import {AbstractSqlDriver, SqlEntityManager} from "@mikro-orm/postgresql";

export class ReactionRepo extends BaseRepo<ReactionEntity> {

  constructor() {
    super(ReactionEntity);
  }

  upsert(partial: Partial<ReactionEntity>) {
    return this.entityManager.upsert(ReactionEntity, partial);
  }

  nativeDelete(id: string) {
    return this.entityManager.nativeDelete(ReactionEntity, {id});
  }

}


export const reactionRepo = () => new ReactionRepo();
