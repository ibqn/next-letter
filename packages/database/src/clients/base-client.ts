import { LoggerFactory } from "shared/src/utils/logger"

export abstract class BaseClient {
  private logger = LoggerFactory.getLogger(BaseClient.name)
}
