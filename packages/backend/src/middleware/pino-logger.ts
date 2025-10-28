import { pinoLogger as logger } from "hono-pino"
import { LoggerFactory } from "shared/src/utils/logger"

export function pinoLogger() {
  const pino = LoggerFactory.getLogger("hono")
  return logger({ pino, http: { reqId: () => crypto.randomUUID() } })
}
