import {Init} from "./init";
import {MikroORM, RequestContext, TransactionManager} from '@mikro-orm/core';
import {env} from "../../util/env";
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import {Hono} from "hono";
import {EntityManager} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

export class DbInit extends Init {

  private orm!: MikroORM<any>

  constructor(private app: Hono<{
    Variables: {
      transactionManager?: TransactionManager,
      entityManager: EntityManager,
      requestId: string
    }
  }>) {
    super('Database');
  }

  protected async __destroyImplementation(): Promise<void> {
    await this.orm.close();
  }

  protected async __initImplementation(): Promise<void> {
    this.orm = await MikroORM.init({
      metadataProvider: TsMorphMetadataProvider,
      entities: ['./dist/entity/**/*.js'],
      entitiesTs: ['./src/entity/**/*.ts'],
      host: env.database.host,
      port: env.database.port,
      dbName: env.database.name,
      user: env.database.username,
      password: env.database.password,
      schema: env.database.schema,
      driver: PostgreSqlDriver,
    });
    this.app.use(async (context, next) => {
      const entityManager = this.orm.em.fork();
      context.set('entityManager', entityManager)
      await RequestContext.create(entityManager, next);
    });
    if(env.environment === 'development') {
      // await this.orm.getSchemaGenerator().refreshDatabase();
      await this.orm.getSchemaGenerator().updateSchema();
    }
  }

}

