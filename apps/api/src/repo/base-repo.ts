import {BaseEntity} from "../entity/base-entity";
import {EntityManager} from "@mikro-orm/core";
import {RequestContext} from "@mikro-orm/postgresql";


export abstract class BaseRepo<Entity extends BaseEntity>  {

  protected constructor(private entity: {new(): Entity}) {}

  get entityManager() {
    return (RequestContext.getEntityManager() as EntityManager)
  }

  find(): Promise<Entity[]> {
    return this.entityManager.find(this.entity, {})
  }

  findById(id: string): Promise<Entity> {
    return this.entityManager.findOne(this.entity, id)
  }

  findOne(filter: Partial<Entity>): Promise<Entity> {
    return this.entityManager.findOne(this.entity, filter);
  }

  save(entity: Entity) {
    return this.entityManager.persist(entity);
  }

  delete(entity: Entity) {
    return this.entityManager.remove(entity);
  }
}
