import { subscriptionTable, type Subscription } from "../drizzle/schema/subscription"
import { db } from "../drizzle/db"
import { BaseClient } from "shared/src/clients/base-client"
import type { CreateSubscriptionSchema, UpdateSubscriptionSchema } from "../validators/subscription"
import { asc, countDistinct, desc, eq } from "drizzle-orm"
import type { ParamIdSchema } from "../validators/param"
import type { PaginationSchema, SortedBySchema } from "../validators/pagination"

type GetSubscriptionItemOptions = {
  subscriptionId: string
}

type GetSubscriptionItemsOptions = PaginationSchema

export class SubscriptionClient extends BaseClient {
  async createSubscriptionItem(input: CreateSubscriptionSchema): Promise<Subscription> {
    const [subscription] = await db.insert(subscriptionTable).values(input).returning()
    return subscription satisfies Subscription
  }

  async updateSubscriptionItem(input: ParamIdSchema & UpdateSubscriptionSchema): Promise<Subscription | null> {
    const [subscription] = await db
      .update(subscriptionTable)
      .set(input)
      .where(eq(subscriptionTable.id, input.id))
      .returning()

    return subscription satisfies Subscription
  }

  async deleteSubscriptionItem({ id }: ParamIdSchema): Promise<{ id: string | null }> {
    const [subscription] = await db
      .delete(subscriptionTable)
      .where(eq(subscriptionTable.id, id))
      .returning({ id: subscriptionTable.id })

    return { id: subscription?.id ?? null }
  }

  async getSubscriptionItemsCount() {
    const [{ count }] = await db.select({ count: countDistinct(subscriptionTable.id) }).from(subscriptionTable)

    return count
  }

  async getSubscriptionItem({ subscriptionId }: GetSubscriptionItemOptions): Promise<Subscription | null> {
    const subscription = await db.query.subscription.findFirst({
      where: (subscription, { eq }) => eq(subscription.id, subscriptionId),
    })

    if (!subscription) {
      return null
    }

    return subscription satisfies Subscription
  }

  private getSortedByColumn(sortedBy: SortedBySchema) {
    switch (sortedBy) {
      case "email":
        return subscriptionTable.email
      case "recent":
        return subscriptionTable.createdAt
      default:
        throw new Error("Invalid sortedBy value")
    }
  }

  async getSubscriptionItems({ page, limit, sortedBy, order }: GetSubscriptionItemsOptions): Promise<Subscription[]> {
    const offset = (page - 1) * limit

    const sortedByColumn = this.getSortedByColumn(sortedBy)
    const orderBy = order === "desc" ? desc(sortedByColumn) : asc(sortedByColumn)

    const subscriptionItems = await db.query.subscription.findMany({
      offset,
      limit,
      orderBy: [orderBy, asc(subscriptionTable.id)],
    })

    return subscriptionItems
  }
}
