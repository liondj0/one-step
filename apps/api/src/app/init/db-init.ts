import {Init} from "./init";
import {Client} from 'pg'
import config from "../../util/config";
import {drizzle} from "drizzle-orm/node-postgres";

export class DbInit extends Init {
  private static __client: Client;
  private static __db: ReturnType<typeof drizzle>


  constructor() {
    super('Database');
  }

  protected async __destroyImplementation(): Promise<void> {
    await DbInit.__client.end();
  }

  protected async __initImplementation(): Promise<void> {
    DbInit.__client = new Client({...config.database});
    await DbInit.__client.connect();
    DbInit.__db = drizzle(DbInit.__client);
  }

  static db() {
    if(!DbInit.__db) {throw new Error('Database not initialized')}
    return DbInit.__db;
  }

}
