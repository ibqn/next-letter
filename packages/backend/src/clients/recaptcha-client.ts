import { BaseClient } from "shared/src/clients/base-client"
import axios from "axios"
import { env } from "../env"
import type { ReCaptchaResponse } from "shared/src/recaptcha"

export class ReCaptchaClient extends BaseClient {
  constructor() {
    super()
  }

  async verifyToken(token: string): Promise<ReCaptchaResponse> {
    const secret = env.RE_CAPTCHA_SECRET_KEY
    this.logger.info("Verifying reCAPTCHA token with Google API")
    const response = await axios.post<ReCaptchaResponse>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    )

    return response.data
  }
}
