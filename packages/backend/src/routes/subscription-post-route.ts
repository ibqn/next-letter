import type { ExtEnv } from "../utils/extended-env"
import { zValidator } from "../utils/z-validator"
import { SubscriptionClient } from "database/src/clients/subscription-client"
import { createSubscriptionSchema } from "database/src/validators/subscription"
import { error, response, type ErrorResponse, type SuccessResponse } from "shared/src/response"
import type { Subscription } from "database/src/drizzle/schema/subscription"
import { ReCaptchaClient } from "../clients/recaptcha-client"
import { reCaptchaTokenSchema } from "shared/src/validators/rechaptcha"
import { AbstractRoute } from "./abstract-route"

export type SubscriptionPostRouteConfig = {
  subscriptionClient: SubscriptionClient
  reCaptchaClient: ReCaptchaClient
}

export class SubscriptionPostRoute extends AbstractRoute<ExtEnv> {
  constructor(private config: SubscriptionPostRouteConfig) {
    super()
  }

  public handler = this.factory.createHandlers(
    zValidator("json", createSubscriptionSchema.and(reCaptchaTokenSchema)),
    async (c) => {
      this.logger.info("Handling subscription creation")

      const { token, ...subscriptionData } = c.req.valid("json")

      this.logger.info("Verifying reCAPTCHA token")
      const reCaptchaResult = await this.config.reCaptchaClient.verifyToken(token)
      this.logger.info({ reCaptchaResult }, "reCAPTCHA verification result")

      if (!reCaptchaResult.success) {
        this.logger.warn("reCAPTCHA verification failed")
        return c.json<ErrorResponse>(error("reCAPTCHA verification failed"), 403)
      }

      const subscription = await this.config.subscriptionClient.createSubscriptionItem(subscriptionData)

      this.logger.info({ subscriptionId: subscription.id }, "Successfully created subscription")

      return c.json<SuccessResponse<Subscription>>(response(subscription), 201)
    }
  )
}

const subscriptionPostDependencies: SubscriptionPostRouteConfig = {
  subscriptionClient: new SubscriptionClient(),
  reCaptchaClient: new ReCaptchaClient(),
}

export const subscriptionPostRoute = () => new SubscriptionPostRoute(subscriptionPostDependencies).handler
