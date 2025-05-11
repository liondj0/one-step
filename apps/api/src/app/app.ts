import { Hono } from 'hono'
import {DbInit} from "./init/db-init";
import {RestInit} from "./init/rest-init";

const app = new Hono()

const inits = [new DbInit(), new RestInit(app)];

for(const init of inits) {
  await init.init();
}

export default app
