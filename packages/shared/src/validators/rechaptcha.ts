import { z } from "zod"

export const reCaptchaTokenSchema = z.object({
  token: z.string().min(1, "reCAPTCHA token is required"),
})

export type ReCaptchaTokenSchema = z.infer<typeof reCaptchaTokenSchema>
