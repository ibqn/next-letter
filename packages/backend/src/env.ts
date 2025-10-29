import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.url(),
  RE_CAPTCHA_SECRET_KEY: z.string().min(1, "reCAPTCHA secret key is required"),
})

export type env = z.infer<typeof envSchema>

const result = envSchema.safeParse(process.env)

if (result.error) {
  console.error("❌ Invalid env:")
  console.error(JSON.stringify(z.flattenError(result.error).fieldErrors, null, 2))
  process.exit(1)
}

export const env = result.data
