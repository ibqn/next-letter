import type { Logger } from "pino"
import { LoggerFactory } from "../utils/logger"

export abstract class BaseClient {
  protected logger: Logger

  constructor() {
    this.logger = LoggerFactory.getLogger(this.constructor.name)
  }
}
