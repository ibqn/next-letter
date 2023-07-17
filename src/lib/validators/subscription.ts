import { z } from "zod"

export const SubscriptionValidator = z.object({
  email: z.string().email("Not a valid Email address. Email address is expected"),
})

export type SubscriptionPayload = z.infer<typeof SubscriptionValidator>
