"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { axios } from "@/api/axios"
import { toast } from "sonner"
import { subscriptionValidator, type SubscriptionPayload } from "@/lib/validators"
import { isAxiosError } from "axios"
import Script from "next/script"
import { env } from "@/lib/env"

export const SubscribeForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionPayload>({
    resolver: zodResolver(subscriptionValidator),
    defaultValues: {
      email: "",
    },
  })

  const subscriptionHandler = async (token: string, data: SubscriptionPayload) => {
    try {
      await axios.post("/subscription", data)
      setValue("email", "")
      toast.success("Congratulations, You have successfully subscribed.")
    } catch (error) {
      console.log(error)
      if (isAxiosError(error) && error?.response?.status === 409) {
        toast("This Email is already subscribed!")
      } else {
        toast.error("Something went wrong!")
      }
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    grecaptcha.ready(function () {
      grecaptcha.execute("reCAPTCHA_site_key", { action: "submit" }).then(function (token) {
        // Add your logic to submit to your backend server here.
      })
    })
  })

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY}`} />
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 flex-col">
          <Input type="email" placeholder="Email address" {...register("email")} />
          {errors.email && <div className="mt-2 text-sm text-red-400">{errors.email.message}</div>}
        </div>
        <Button type="submit">Subscribe</Button>
      </form>
    </>
  )
}
