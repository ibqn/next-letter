import { serve } from "@hono/node-server"
import { Hono } from "hono"
import type { ExtEnv } from "./utils/extended-env"
import { prettyJSON } from "hono/pretty-json"
import { HTTPException } from "hono/http-exception"
import { getErrorMessage } from "./utils/error"
import { pinoLogger } from "./middleware/pino-logger"
import { env } from "./env"
import { error, response, type ErrorResponse, type SuccessResponse } from "shared/src/response"
import { subscriptionRoute } from "./routes/subscription"
import { corsMiddleware } from "./handlers/cors-middleware"
import { compress } from "hono/compress"

const app = new Hono<ExtEnv>()

app.use(pinoLogger())
app.use(prettyJSON())
app.use(compress())

app.notFound((c) => c.json<ErrorResponse>(error("Not Found"), 404))

app.get("/", (c) => c.json<SuccessResponse>(response(), 201))

app.onError((e, c) => {
  if (e instanceof HTTPException) {
    const errorResponse = e.res ?? c.json<ErrorResponse>(error(e.message), e.status)
    return errorResponse
  }

  return c.json<ErrorResponse>(error(getErrorMessage(e)), 500)
})

app.use("*", corsMiddleware())

export const routes = app.basePath("/api").route("/subscription", subscriptionRoute)

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
