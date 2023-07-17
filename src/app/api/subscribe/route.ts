import { prisma } from "@/lib/prisma"
import { SubscriptionValidator } from "@/lib/validators"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { email } = SubscriptionValidator.parse(body)

    const subscription = await prisma.subscription.create({
      data: { email },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message)
      return NextResponse.json({ messages })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        return NextResponse.json({ message: "email already subscribed" }, { status: 409 })
      }
    }

    throw error
  }
}
