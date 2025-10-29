import type { Env } from "hono"
import { createFactory } from "hono/factory"
import type { Logger } from "pino"
import { LoggerFactory } from "shared/src/utils/logger"

export abstract class AbstractRoute<ExtEnv extends Env> {
  protected logger: Logger
  protected factory = createFactory<ExtEnv>()

  constructor() {
    this.logger = LoggerFactory.getLogger(this.constructor.name)
  }
}
