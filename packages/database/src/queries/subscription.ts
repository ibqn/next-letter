import { asc, countDistinct, desc, eq } from "drizzle-orm"
import { db } from "../drizzle/db"
import { subscriptionTable, type Subscription } from "../drizzle/schema/subscription"
import type { PaginationSchema, SortedBySchema } from "../validators/pagination"
import type { CreateSubscriptionSchema, UpdateSubscriptionSchema } from "../validators/subscription"
import type { ParamIdSchema } from "../validators/param"

export const createSubscriptionItem = async (input: CreateSubscriptionSchema): Promise<Subscription> => {
  await db.insert(subscriptionTable).values(input).onConflictDoNothing()

  const [subscription] = await db.select().from(subscriptionTable).where(eq(subscriptionTable.email, input.email))

  return subscription satisfies Subscription
}

export const updateSubscriptionItem = async (
  input: ParamIdSchema & UpdateSubscriptionSchema
): Promise<Subscription | null> => {
  const [subscription] = await db
    .update(subscriptionTable)
    .set(input)
    .where(eq(subscriptionTable.id, input.id))
    .returning()

  return subscription satisfies Subscription
}

export const deleteSubscriptionItem = async ({ id }: ParamIdSchema): Promise<{ id: string | null }> => {
  const [subscription] = await db
    .delete(subscriptionTable)
    .where(eq(subscriptionTable.id, id))
    .returning({ id: subscriptionTable.id })

  return { id: subscription?.id ?? null }
}

export const getSubscriptionItemsCount = async () => {
  const [{ count }] = await db.select({ count: countDistinct(subscriptionTable.id) }).from(subscriptionTable)

  return count
}

type GetSubscriptionItemOptions = {
  subscriptionId: string
}

export const getSubscriptionItem = async ({
  subscriptionId,
}: GetSubscriptionItemOptions): Promise<Subscription | null> => {
  const subscription = await db.query.subscription.findFirst({
    where: (subscription, { eq }) => eq(subscription.id, subscriptionId),
  })

  if (!subscription) {
    return null
  }

  return subscription satisfies Subscription
}

type GetSubscriptionItemsOptions = PaginationSchema

const getSortedByColumn = (sortedBy: SortedBySchema) => {
  switch (sortedBy) {
    case "email":
      return subscriptionTable.email
    case "recent":
      return subscriptionTable.createdAt
    default:
      throw new Error("Invalid sortedBy value")
  }
}

export const getSubscriptionItems = async ({
  page,
  limit,
  sortedBy,
  order,
}: GetSubscriptionItemsOptions): Promise<Subscription[]> => {
  const offset = (page - 1) * limit

  const sortedByColumn = getSortedByColumn(sortedBy)
  const orderBy = order === "desc" ? desc(sortedByColumn) : asc(sortedByColumn)

  const subscriptionItems = await db.query.subscription.findMany({
    offset,
    limit,
    orderBy: [orderBy, asc(subscriptionTable.id)],
  })

  return subscriptionItems
}
