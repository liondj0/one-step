import {BaseModel} from "@repo/common/src/models/base-model";
import {PgTableWithColumns} from "drizzle-orm/pg-core";
import db from "../db";
import {eq, TableConfig} from "drizzle-orm";
import {baseSchema} from "../db/schema";


export abstract class BaseRepo<Model extends BaseModel, Table extends PgTableWithColumns<TableConfig>> {
  private get db() {
    return db();
  }
  constructor(private readonly table: Table) {}

  abstract save(model: Model): Promise<Model>;

  async delete(id: string): Promise<{deleted: number}> {
    const result = await this.db.delete(this.table).where(eq(this.table.id, id));
    if(!result.rowCount) throw new Error(`Failed to delete entry.`)
    return {deleted: result.rowCount};
  }




}
