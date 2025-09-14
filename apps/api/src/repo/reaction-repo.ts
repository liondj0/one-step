import {BaseRepo} from "./base-repo";
import {ReactionEntity} from "../entity/reaction-entity";

export class ReactionRepo extends BaseRepo<ReactionEntity> {

  constructor() {
    super(ReactionEntity);
  }

  upsert(partial: Partial<ReactionEntity>) {
    return this.entityManager.upsert(ReactionEntity, partial);
  }

}


export const reactionRepo = () => new ReactionRepo();
