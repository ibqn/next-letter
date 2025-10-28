"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { subscriptionValidator, type SubscriptionPayload } from "@/lib/validators"


export const SubscribeForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SubscriptionPayload>({
    resolver: zodResolver(subscriptionValidator),
  })

    const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      await axios.post("/api/subscribe", data)
      reset()
      toast.success(
        "Congratulations, You have successfully subscribed."
      )
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error) && error?.response?.status === 409) {
        toast("This Email is already subscribed!")
      } else {
        toast.error("Something went wrong!")
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
