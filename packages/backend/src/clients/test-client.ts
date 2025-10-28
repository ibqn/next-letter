import { LoggerFactory } from "shared/src/utils/logger"

export type TestClientConfig = {}

export class TestClient {
  logger = LoggerFactory.getLogger(TestClient.name)

  constructor(private config: TestClientConfig) {}

  public async testMethod() {
    this.logger.info("Testing TestClient")
  }
}
