import { type Adapter } from "next-auth/adapters";
import { PgDatabase, type PgQueryResultHKT } from "drizzle-orm/pg-core";
import { type DefaultPostgresSchema } from "./utils.js";
export declare function DrizzlePostgresAdapter(db: PgDatabase<PgQueryResultHKT, any>, schema?: DefaultPostgresSchema): Adapter;
//# sourceMappingURL=index.d.ts.map