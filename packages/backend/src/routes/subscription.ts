import type { ExtEnv } from "../utils/extended-env"
import { Hono } from "hono"
import { subscriptionPostRoute } from "./subscription-post-route"

const subscriptionRoute = new Hono<ExtEnv>()

subscriptionRoute.post("/", ...subscriptionPostRoute())

export { subscriptionRoute }
