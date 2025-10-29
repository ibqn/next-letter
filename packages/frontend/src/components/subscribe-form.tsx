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
import type { ReCaptchaTokenSchema } from "shared/src/validators/rechaptcha"

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

  const subscriptionHandler = async (data: SubscriptionPayload & ReCaptchaTokenSchema) => {
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
    console.log("submitted data", data)

    window.grecaptcha.ready(function () {
      window.grecaptcha.execute(env.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY, { action: "subscription" }).then(function (token) {
        subscriptionHandler({ ...data, token })
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
