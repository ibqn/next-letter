import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY: z.string().min(1, "RE_CAPTCHA_SITE_KEY is required"),
  },
  server: {
    API_URL: z.url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
})
