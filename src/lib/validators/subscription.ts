import { z } from "zod"

export const subscriptionValidator = z.object({
  email: z.string().email("Not a valid Email address. Email address is expected"),
})

export type SubscriptionPayload = z.infer<typeof subscriptionValidator>
