import { text, uuid } from "drizzle-orm/pg-core"
import { schema } from "./schema"
import { createdAtUpdatedAt } from "./utils"
import type { InferSelectModel } from "drizzle-orm"

export const subscriptionTable = schema.table("subscription", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  ...createdAtUpdatedAt,
})

export type Subscription = InferSelectModel<typeof subscriptionTable>
