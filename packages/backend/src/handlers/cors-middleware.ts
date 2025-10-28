import { cors } from "hono/cors"
import { env } from "../env"
import { LoggerFactory } from "shared/src/utils/logger"

export type CorsMiddlewareConfig = {}

export class CorsMiddleware {
  private logger = LoggerFactory.getLogger(CorsMiddleware.name)

  constructor(private config: CorsMiddlewareConfig) {}

  public handler = cors({
    origin: (origin) => {
      this.logger.info(`CORS origin check: ${origin}`)
      if (origin.includes("localhost") || origin.includes(env.FRONTEND_URL)) {
        return origin
      }
    },
    credentials: true,
  })
}

export const corsMiddleware = () => new CorsMiddleware({}).handler
