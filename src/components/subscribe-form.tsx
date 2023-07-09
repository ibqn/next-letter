"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { useToast } from "./ui/use-toast"

type FormaData = {
  email: string
}

const schema = z.object({
  email: z.string().email({ message: "A valid Email address is required" }),
})

type Props = {}

export const SubscribeForm = (props: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormaData>({
    resolver: zodResolver(schema),
  })

  const { toast } = useToast()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      await axios.post("/api/subscribe", data)
      reset()
      toast({
        title: "Subscription success",
        description: "Congratulations, You have successfully subscribed.",
        variant: "green",
      })
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error) && error?.response?.status === 409) {
        toast({ title: "Subscription error", description: "This Email is already subscribed!", variant: "destructive" })
      } else {
        toast({ title: "Subscription error", description: "Something went wrong!", variant: "destructive" })
      }
    }
  })

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 flex-col">
        <Input type="email" placeholder="Email address" {...register("email")} />
        {errors.email && <div className="mt-2 text-sm text-red-400">{errors.email.message}</div>}
      </div>

      <Button type="submit">Subscribe</Button>
    </form>
  )
}
