import { type Adapter } from "next-auth/adapters"
import {PgDatabase, type PgQueryResultHKT} from "drizzle-orm/pg-core"
import { PostgresDrizzleAdapter, type DefaultPostgresSchema } from "./utils.js"
export function DrizzlePostgresAdapter(
  db: PgDatabase<PgQueryResultHKT,any>,
  schema?: DefaultPostgresSchema
): Adapter {
  
    return PostgresDrizzleAdapter(db, schema as DefaultPostgresSchema)
  

  
}
