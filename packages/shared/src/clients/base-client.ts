import { LoggerFactory } from "../utils/logger"

export abstract class BaseClient {
  private logger = LoggerFactory.getLogger(BaseClient.name)
}
