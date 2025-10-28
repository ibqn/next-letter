import type { ValidationTargets } from "hono"
import type { ZodType } from "zod"
import { zValidator as zv } from "@hono/zod-validator"
import { HTTPException } from "hono/http-exception"

export const zValidator = <T extends ZodType, Target extends keyof ValidationTargets>(target: Target, schema: T) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, { message: result.error.issues.map(({ message }) => message).join(", ") })
    }
  })
