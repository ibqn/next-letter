import { z } from "zod"
import { paginationSchema } from "./pagination"
import { createInsertSchema } from "drizzle-zod"
import { subscriptionTable } from "../drizzle/schema/subscription"

export const createSubscriptionSchema = createInsertSchema(subscriptionTable, {
  email: z.email(),
}).omit({ id: true, createdAt: true, updatedAt: true })

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>

export const updateSubscriptionSchema = createInsertSchema(subscriptionTable, {
  email: z.email(),
}).omit({ id: true, createdAt: true, updatedAt: true })

export type UpdateSubscriptionSchema = z.infer<typeof updateSubscriptionSchema>

export const subscriptionSearchSchema = paginationSchema
export type SubscriptionSearchSchema = z.infer<typeof subscriptionSearchSchema>
