import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

type Body = {
  email: string
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body

  const { email } = body

  try {
    const subscription = await prisma.subscription.create({
      data: { email },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'email already subscribed' }, { status: 409 })
      }
    }

    throw error
  }
}
