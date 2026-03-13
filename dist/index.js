import {} from "next-auth/adapters";
import { PgDatabase } from "drizzle-orm/pg-core";
import { PostgresDrizzleAdapter } from "./utils.js";
export function DrizzlePostgresAdapter(db, schema) {
    return PostgresDrizzleAdapter(db, schema);
}
//# sourceMappingURL=index.js.map