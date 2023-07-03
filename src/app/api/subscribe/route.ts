import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Body = {
  email: string
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body

  const { email } = body

  const subscription = await prisma.subscription.create({
    data: { email },
  })

  return NextResponse.json(subscription)
}
