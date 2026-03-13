import { and, eq, getTableColumns, param, type ExtractTablesWithRelations, type GeneratedColumnConfig } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, text, timestamp, type PgColumn, type PgDatabase, type PgQueryResultHKT, type PgTableWithColumns } from "drizzle-orm/pg-core";
import type { Adapter, AdapterAccount, AdapterAccountType, AdapterAuthenticator, AdapterSession, AdapterUser, VerificationToken } from "@auth/core/adapters";
import type { Awaitable } from "@auth/core/types";
type DefaultPostgresColumn<
    T extends {
        data: string | number | boolean | Date
        dataType: "string" | "number" | "boolean" | "date"
        notNull: boolean
        isPrimaryKey?: boolean
        columnType:
        | "PgVarchar"
        | "PgText"
        | "PgBoolean"
        | "PgTimestamp"
        | "PgInteger"
        | "PgUUID"
    },
> = PgColumn<{
    name: string
    isAutoincrement: boolean
    isPrimaryKey: T["isPrimaryKey"] extends true ? true : false
    hasRuntimeDefault: boolean
    generated: GeneratedColumnConfig<T["data"]> | undefined
    columnType: T["columnType"]
    data: T["data"]
    driverParam: string | number | boolean
    notNull: T["notNull"]
    hasDefault: boolean
    enumValues: any
    dataType: T["dataType"]
    tableName: string
}>

export type DefaultPostgresUsersTable = PgTableWithColumns<{
    name: string
    columns: {
        id: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText" | "PgUUID"
            isPrimaryKey: true
            data: string
            notNull: true
            dataType: "string"
        }>
        name: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
            dataType: "string"
        }>
        email: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
            dataType: "string"
        }>
        emailVerified: DefaultPostgresColumn<{
            dataType: "date"
            columnType: "PgTimestamp"
            data: Date
            notNull: boolean
        }>
        image: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
    }
    dialect: "pg"
    schema: string | undefined
}>

export type DefaultPostgresAccountsTable = PgTableWithColumns<{
    name: string
    columns: {
        userId: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText" | "PgUUID"
            data: string
            notNull: true
            dataType: "string"
        }>
        type: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        provider: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        providerAccountId: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
        }>
        refresh_token: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
        access_token: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
        expires_at: DefaultPostgresColumn<{
            dataType: "number"
            columnType: "PgInteger"
            data: number
            notNull: boolean
        }>
        token_type: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
        scope: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
        id_token: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
        session_state: DefaultPostgresColumn<{
            dataType: "string"
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: boolean
        }>
    }
    dialect: "pg"
    schema: string | undefined
}>

export type DefaultPostgresSessionsTable = PgTableWithColumns<{
    name: string
    columns: {
        sessionToken: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            isPrimaryKey: true
            notNull: true
            dataType: "string"
        }>
        userId: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText" | "PgUUID"
            data: string
            notNull: true
            dataType: "string"
        }>
        expires: DefaultPostgresColumn<{
            dataType: "date"
            columnType: "PgTimestamp"
            data: Date
            notNull: true
        }>
    }
    dialect: "pg"
    schema: string | undefined
}>

export type DefaultPostgresVerificationTokenTable = PgTableWithColumns<{
    name: string
    columns: {
        identifier: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        token: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        expires: DefaultPostgresColumn<{
            dataType: "date"
            columnType: "PgTimestamp"
            data: Date
            notNull: true
        }>
    }
    dialect: "pg"
    schema: string | undefined
}>

export type DefaultPostgresAuthenticatorTable = PgTableWithColumns<{
    name: string
    columns: {
        credentialID: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        userId: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText" | "PgUUID"
            data: string
            notNull: true
            dataType: "string"
        }>
        providerAccountId: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        credentialPublicKey: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        counter: DefaultPostgresColumn<{
            columnType: "PgInteger"
            data: number
            notNull: true
            dataType: "number"
        }>
        credentialDeviceType: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: true
            dataType: "string"
        }>
        credentialBackedUp: DefaultPostgresColumn<{
            columnType: "PgBoolean"
            data: boolean
            notNull: true
            dataType: "boolean"
        }>
        transports: DefaultPostgresColumn<{
            columnType: "PgVarchar" | "PgText"
            data: string
            notNull: false
            dataType: "string"
        }>
    }
    dialect: "pg"
    schema: string | undefined
}>
export type DefaultPostgresSchema = {
    usersTable: DefaultPostgresUsersTable
    accountsTable: DefaultPostgresAccountsTable
    sessionsTable?: DefaultPostgresSessionsTable
    verificationTokensTable?: DefaultPostgresVerificationTokenTable
    authenticatorsTable?: DefaultPostgresAuthenticatorTable
}
export function defineTables(
    schema: Partial<DefaultPostgresSchema> = {}
): Required<DefaultPostgresSchema> {
    const usersTable =
        schema.usersTable ??
        (pgTable("user", {
            id: text("id")
                .primaryKey()
                .$defaultFn(() => crypto.randomUUID()),
            name: text("name"),
            email: text("email").unique(),
            emailVerified: timestamp("emailVerified", { mode: "date" }),
            image: text("image"),
        }) satisfies DefaultPostgresUsersTable)

    const accountsTable =
        schema.accountsTable ??
        (pgTable(
            "account",
            {
                userId: text("userId")
                    .notNull()
                    .references(() => usersTable.id, { onDelete: "cascade" }),
                type: text("type").$type<AdapterAccountType>().notNull(),
                provider: text("provider").notNull(),
                providerAccountId: text("providerAccountId").notNull(),
                refresh_token: text("refresh_token"),
                access_token: text("access_token"),
                expires_at: integer("expires_at"),
                token_type: text("token_type"),
                scope: text("scope"),
                id_token: text("id_token"),
                session_state: text("session_state"),
            },
            (account) => ({
                compositePk: primaryKey({
                    columns: [account.provider, account.providerAccountId],
                }),
            })
        ) satisfies DefaultPostgresAccountsTable)

    const sessionsTable =
        schema.sessionsTable ??
        (pgTable("session", {
            sessionToken: text("sessionToken").primaryKey(),
            userId: text("userId")
                .notNull()
                .references(() => usersTable.id, { onDelete: "cascade" }),
            expires: timestamp("expires", { mode: "date" }).notNull(),
        }) satisfies DefaultPostgresSessionsTable)

    const verificationTokensTable =
        schema.verificationTokensTable ??
        (pgTable(
            "verificationToken",
            {
                identifier: text("identifier").notNull(),
                token: text("token").notNull(),
                expires: timestamp("expires", { mode: "date" }).notNull(),
            },
            (verificationToken) => ({
                compositePk: primaryKey({
                    columns: [verificationToken.identifier, verificationToken.token],
                }),
            })
        ) satisfies DefaultPostgresVerificationTokenTable)

    const authenticatorsTable =
        schema.authenticatorsTable ??
        (pgTable(
            "authenticator",
            {
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
            },
            (authenticator) => ({
                compositePK: primaryKey({
                    columns: [authenticator.userId, authenticator.credentialID],
                }),
            })
        ) satisfies DefaultPostgresAuthenticatorTable)

    return {
        usersTable,
        accountsTable,
        sessionsTable,
        verificationTokensTable,
        authenticatorsTable,
    }
}
export function PostgresDrizzleAdapter(db: PgDatabase<PgQueryResultHKT, any, ExtractTablesWithRelations<any>>, schema: DefaultPostgresSchema): Adapter {
    const { usersTable, sessionsTable, accountsTable, authenticatorsTable, verificationTokensTable } = defineTables(schema)

    const adapter: Adapter = {
        async createUser(data) {
            const {
                id,
                ...userData
            } = data
            const hasDefaultId = getTableColumns(usersTable)["id"]["hasDefault"]
            const r = await db.insert(usersTable).values(hasDefaultId ? userData : { id, ...userData }).returning();
            return r[0] as Awaitable<AdapterUser>;
        },
        async createSession(data) {
            const rtn = db
                .insert(sessionsTable)
                .values(data)
                .returning()
                .then((res) => res[0]!)
            return rtn
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
                .where(eq(sessionsTable.sessionToken, sessionToken))

        },
        async deleteUser(userId) {
            await db.delete(usersTable).where(eq(usersTable.id, userId))
        },
        async getUserByEmail(email) {
            return db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .then((res) =>
                    res.length > 0 ? res[0] : null
                ) as Awaitable<AdapterUser | null>
        },

        async getUserByAccount({ provider, providerAccountId }) {
            const result = await db
                .select({
                    account: accountsTable,
                    user: usersTable,
                })
                .from(accountsTable)
                .innerJoin(usersTable, eq(accountsTable.userId, usersTable.id))
                .where(
                    and(
                        eq(accountsTable.provider, provider),
                        eq(accountsTable.providerAccountId, providerAccountId)
                    )
                )
                .then((res) => res[0])

            const user = result?.user ?? null
            return user as Awaitable<AdapterUser | null>
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
                .then((res) => (res.length > 0 ? res[0] : null)) as Awaitable<{
                    session: AdapterSession
                    user: AdapterUser
                } | null>
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
                throw new Error("No user id.")
            }

            const [result] = await db
                .update(usersTable)
                .set(data)
                .where(eq(usersTable.id, data.id))
                .returning()

            if (!result) {
                throw new Error("No user found.")
            }

            return result as Awaitable<AdapterUser>
        },
        async useVerificationToken(params) {
            return db
                .delete(verificationTokensTable)
                .where(
                    and(
                        eq(verificationTokensTable.identifier, params.identifier),
                        eq(verificationTokensTable.token, params.token)
                    )
                )
                .returning()
                .then((res) => (res.length > 0 ? res[0] : {
                    expires: new Date(new Date().getTime() + 60 * 60 * 1000), // default to 1 hour in the future
                    identifier: params.identifier,
                    token: params.token
                }) as Awaitable<VerificationToken>)
        },
        getUser(id) {
            return db.select().from(usersTable).where(eq(usersTable.id, id)).then((res) => res.length > 0 ? res[0] : null) as Awaitable<AdapterUser | null>
        },
        createAuthenticator(authenticator) {
            return db
                .insert(authenticatorsTable)
                .values(authenticator)
                .returning()
                .then((res) => res[0] ?? null) as Awaitable<AdapterAuthenticator>
        },
        getAccount(providerAccountId, provider) {
            return db
                .select()
                .from(accountsTable)
                .where(
                    and(
                        eq(accountsTable.provider, provider),
                        eq(accountsTable.providerAccountId, providerAccountId)
                    )
                )
                .then((res) => res[0] ?? null) as Promise<AdapterAccount | null>
        },
        getAuthenticator(credentialID) {
            return db
                .select()
                .from(authenticatorsTable)
                .where(eq(authenticatorsTable.credentialID, credentialID))
                .then((res) => res[0] ?? null) as Awaitable<AdapterAuthenticator | null>
        },
        async linkAccount(account) {
            await db.insert(accountsTable).values(account)
        },
        listAuthenticatorsByUserId(userId) {
            return db
                .select()
                .from(authenticatorsTable)
                .where(eq(authenticatorsTable.userId, userId))
                .then((res) => res) as Awaitable<AdapterAuthenticator[]>
        },
        async unlinkAccount(params) {
            await db
                .delete(accountsTable)
                .where(
                    and(
                        eq(accountsTable.provider, params.provider),
                        eq(accountsTable.providerAccountId, params.providerAccountId)
                    )
                )
        },
        async updateAuthenticatorCounter(credentialID, newCounter) {
            const authenticator = await db
                .update(authenticatorsTable)
                .set({ counter: newCounter })
                .where(eq(authenticatorsTable.credentialID, credentialID))
                .returning()
                .then((res) => res[0])

            if (!authenticator) throw new Error("Authenticator not found.")

            return authenticator as Awaitable<AdapterAuthenticator>
        },

    }
    return adapter
}