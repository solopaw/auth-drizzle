import { and, eq, getTableColumns, param } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
export function defineTables(schema = {}) {
    const usersTable = schema.usersTable ??
        pgTable("user", {
            id: text("id")
                .primaryKey()
                .$defaultFn(() => crypto.randomUUID()),
            name: text("name"),
            email: text("email").unique(),
            emailVerified: timestamp("emailVerified", { mode: "date" }),
            image: text("image"),
        });
    const accountsTable = schema.accountsTable ??
        pgTable("account", {
            userId: text("userId")
                .notNull()
                .references(() => usersTable.id, { onDelete: "cascade" }),
            type: text("type").$type().notNull(),
            provider: text("provider").notNull(),
            providerAccountId: text("providerAccountId").notNull(),
            refresh_token: text("refresh_token"),
            access_token: text("access_token"),
            expires_at: integer("expires_at"),
            token_type: text("token_type"),
            scope: text("scope"),
            id_token: text("id_token"),
            session_state: text("session_state"),
        }, (account) => ({
            compositePk: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        }));
    const sessionsTable = schema.sessionsTable ??
        pgTable("session", {
            sessionToken: text("sessionToken").primaryKey(),
            userId: text("userId")
                .notNull()
                .references(() => usersTable.id, { onDelete: "cascade" }),
            expires: timestamp("expires", { mode: "date" }).notNull(),
        });
    const verificationTokensTable = schema.verificationTokensTable ??
        pgTable("verificationToken", {
            identifier: text("identifier").notNull(),
            token: text("token").notNull(),
            expires: timestamp("expires", { mode: "date" }).notNull(),
        }, (verificationToken) => ({
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        }));
    const authenticatorsTable = schema.authenticatorsTable ??
        pgTable("authenticator", {
            credentialID: text("credentialID").notNull().unique(),
            userId: text("userId")
                .notNull()
                .references(() => usersTable.id, { onDelete: "cascade" }),
            providerAccountId: text("providerAccountId").notNull(),
            credentialPublicKey: text("credentialPublicKey").notNull(),
            counter: integer("counter").notNull(),
            credentialDeviceType: text("credentialDeviceType").notNull(),
            credentialBackedUp: boolean("credentialBackedUp").notNull(),
            transports: text("transports"),
        }, (authenticator) => ({
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        }));
    return {
        usersTable,
        accountsTable,
        sessionsTable,
        verificationTokensTable,
        authenticatorsTable,
    };
}
export function PostgresDrizzleAdapter(db, schema) {
    const { usersTable, sessionsTable, accountsTable, authenticatorsTable, verificationTokensTable } = defineTables(schema);
    const adapter = {
        async createUser(data) {
            const { id, ...userData } = data;
            const hasDefaultId = getTableColumns(usersTable)["id"]["hasDefault"];
            const r = await db.insert(usersTable).values(hasDefaultId ? userData : { id, ...userData }).returning();
            return r[0];
        },
        async createSession(data) {
            const rtn = db
                .insert(sessionsTable)
                .values(data)
                .returning()
                .then((res) => res[0]);
            return rtn;
        },
        async createVerificationToken(token) {
            const res = await db
                .insert(verificationTokensTable)
                .values(token)
                .returning();
            return res[0];
        },
        async deleteSession(sessionToken) {
            await db
                .delete(sessionsTable)
                .where(eq(sessionsTable.sessionToken, sessionToken));
        },
        async deleteUser(userId) {
            await db.delete(usersTable).where(eq(usersTable.id, userId));
        },
        async getUserByEmail(email) {
            return db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .then((res) => res.length > 0 ? res[0] : null);
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const result = await db
                .select({
                account: accountsTable,
                user: usersTable,
            })
                .from(accountsTable)
                .innerJoin(usersTable, eq(accountsTable.userId, usersTable.id))
                .where(and(eq(accountsTable.provider, provider), eq(accountsTable.providerAccountId, providerAccountId)))
                .then((res) => res[0]);
            const user = result?.user ?? null;
            return user;
        },
        getSessionAndUser(sessionToken) {
            return db
                .select({
                session: sessionsTable,
                user: usersTable,
            })
                .from(sessionsTable)
                .where(eq(sessionsTable.sessionToken, sessionToken))
                .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
                .then((res) => (res.length > 0 ? res[0] : null));
        },
        async updateSession(session) {
            const res = await db
                .update(sessionsTable)
                .set(session)
                .where(eq(sessionsTable.sessionToken, session.sessionToken))
                .returning();
            return res[0];
        },
        async updateUser(data) {
            if (!data.id) {
                throw new Error("No user id.");
            }
            const [result] = await db
                .update(usersTable)
                .set(data)
                .where(eq(usersTable.id, data.id))
                .returning();
            if (!result) {
                throw new Error("No user found.");
            }
            return result;
        },
        async useVerificationToken(params) {
            return db
                .delete(verificationTokensTable)
                .where(and(eq(verificationTokensTable.identifier, params.identifier), eq(verificationTokensTable.token, params.token)))
                .returning()
                .then((res) => (res.length > 0 ? res[0] : {
                expires: new Date(new Date().getTime() + 60 * 60 * 1000), // default to 1 hour in the future
                identifier: params.identifier,
                token: params.token
            }));
        },
        getUser(id) {
            return db.select().from(usersTable).where(eq(usersTable.id, id)).then((res) => res.length > 0 ? res[0] : null);
        },
        createAuthenticator(authenticator) {
            return db
                .insert(authenticatorsTable)
                .values(authenticator)
                .returning()
                .then((res) => res[0] ?? null);
        },
        getAccount(providerAccountId, provider) {
            return db
                .select()
                .from(accountsTable)
                .where(and(eq(accountsTable.provider, provider), eq(accountsTable.providerAccountId, providerAccountId)))
                .then((res) => res[0] ?? null);
        },
        getAuthenticator(credentialID) {
            return db
                .select()
                .from(authenticatorsTable)
                .where(eq(authenticatorsTable.credentialID, credentialID))
                .then((res) => res[0] ?? null);
        },
        async linkAccount(account) {
            await db.insert(accountsTable).values(account);
        },
        listAuthenticatorsByUserId(userId) {
            return db
                .select()
                .from(authenticatorsTable)
                .where(eq(authenticatorsTable.userId, userId))
                .then((res) => res);
        },
        async unlinkAccount(params) {
            await db
                .delete(accountsTable)
                .where(and(eq(accountsTable.provider, params.provider), eq(accountsTable.providerAccountId, params.providerAccountId)));
        },
        async updateAuthenticatorCounter(credentialID, newCounter) {
            const authenticator = await db
                .update(authenticatorsTable)
                .set({ counter: newCounter })
                .where(eq(authenticatorsTable.credentialID, credentialID))
                .returning()
                .then((res) => res[0]);
            if (!authenticator)
                throw new Error("Authenticator not found.");
            return authenticator;
        },
    };
    return adapter;
}
//# sourceMappingURL=utils.js.map