import { env } from "@/lib/env"
import axiosNative from "axios"

const defaultOptions = {
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
}

const axios = axiosNative.create(defaultOptions)

export { axios }
