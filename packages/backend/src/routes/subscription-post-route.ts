import type { ExtEnv } from "../utils/extended-env"
import { zValidator } from "../utils/z-validator"
import { SubscriptionClient } from "database/src/clients/subscription-client"
import { createFactory } from "hono/factory"
import { LoggerFactory } from "shared/src/utils/logger"
import { createSubscriptionSchema } from "database/src/validators/subscription"
import { response, type SuccessResponse } from "shared/src/response"
import type { Subscription } from "database/src/drizzle/schema/subscription"

export type SubscriptionPostRouteConfig = {
  subscriptionClient: SubscriptionClient
}

export class SubscriptionPostRoute {
  private logger = LoggerFactory.getLogger(SubscriptionPostRoute.name)
  private factory = createFactory<ExtEnv>()

  constructor(private config: SubscriptionPostRouteConfig) {}

  public handler = this.factory.createHandlers(zValidator("json", createSubscriptionSchema), async (c) => {
    this.logger.info("Handling subscription creation")

    const subscriptionData = c.req.valid("json")

    const subscription = await this.config.subscriptionClient.createSubscriptionItem(subscriptionData)

    this.logger.info({ subscriptionId: subscription.id }, "Successfully created subscription")

    return c.json<SuccessResponse<Subscription>>(response(subscription), 201)
  })
}

const subscriptionPostDependencies: SubscriptionPostRouteConfig = {
  subscriptionClient: new SubscriptionClient(),
}

export const subscriptionPostRoute = () => new SubscriptionPostRoute(subscriptionPostDependencies).handler
