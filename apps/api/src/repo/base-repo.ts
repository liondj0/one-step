import { BaseEntity } from "../entity/base-entity";
import { EntityManager, RequestContext } from "@mikro-orm/postgresql";
import {DeepPartial} from "../types/deep-partial";

export abstract class BaseRepo<Entity extends BaseEntity> {
  protected constructor(private entity: { new (): Entity }) {}

  get entityManager() {
    return RequestContext.getEntityManager() as EntityManager;
  }

  findById(id: string) {
    return this.entityManager.findOne(this.entity, { id });
  }

  findOne(filter: DeepPartial<Entity>) {
    return this.entityManager.findOne(this.entity, filter);
  }

  save(entity: Entity) {
    this.entityManager.persist(entity);
    return entity;
  }

  delete(entity: Entity) {
    return this.entityManager.remove(entity);
  }
}
