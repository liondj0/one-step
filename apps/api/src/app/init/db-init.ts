import {Init} from "./init";
import { drizzle } from 'drizzle-orm/node-postgres';
import config from "../../util/config";

export class DbInit extends Init {
  private __db?: ReturnType<typeof drizzle>;


  constructor() {
    super('Database');

  }

  protected async __destroyImplementation(): Promise<void> {
    delete this.__db
  }

  protected async __initImplementation(): Promise<void> {
    this.__db = drizzle({...config.database})
  }

  get db() {
    return this.__db;
  }

}
