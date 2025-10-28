import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "../env"
import { subscriptionTable } from "./schema/subscription"

export const db = drizzle(env.DATABASE_URL, {
  logger: true,
  schema: {
    subscription: subscriptionTable,
  },
})
