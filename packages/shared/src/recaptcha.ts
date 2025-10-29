export type ReCaptchaErrorCode =
  | "missing-input-secret"
  | "invalid-input-secret"
  | "missing-input-response"
  | "invalid-input-response"
  | "bad-request"
  | "timeout-or-duplicate"

export interface ReCaptchaResponse {
  success: boolean
  challenge_ts: string
  hostname: string
  "error-codes"?: ReCaptchaErrorCode[]
}
