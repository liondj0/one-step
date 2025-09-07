import { Hono } from "hono";
import { DbInit } from "./init/db-init";
import { RestInit } from "./init/rest-init";
import { EntityManager } from "@mikro-orm/core";
import { TransactionManager } from "@mikro-orm/postgresql";

const app = new Hono<{
  Variables: {
    entityManager: EntityManager;
    requestId: string;
    transactionManager?: TransactionManager;
  };
}>();

const inits = [new DbInit(app), new RestInit(app)];

for (const init of inits) {
  await init.init();
}

export default app;
