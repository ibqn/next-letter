import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Props = {
  params: {
    subscriptionId: string
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const { subscriptionId } = params

  try {
    const subscription = await prisma.subscription.delete({
      where: { id: subscriptionId },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ message: "error occurred on unsubscribe" }, { status: 500 })
  }
}
