import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const isDev =
  "process" in globalThis ?
    process.env.NODE_ENV === "development" :
    import.meta.env.DEV
export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_WEB_URL: z.string().url(),
    VITE_API_URL: z.string().url(),
    VITE_IMGPROXY_URL: z.string().url(),
    VITE_SENTRY_DSN: z.string().optional(),
    VITE_POSTHOG_KEY: z.string().optional(),
  },

  emptyStringAsUndefined: true,
  runtimeEnv:
    "process" in globalThis ? process.env : injectExternalEnv(import.meta.env),
  skipValidation: !isDev,
})

function injectExternalEnv<T>(originEnv: T): T {
  if (!("document" in globalThis)) {
    return originEnv
  }
  const prefix = "__followEnv"
  const env = globalThis[prefix]
  if (!env) {
    return originEnv
  }

  for (const key in env) {
    originEnv[key] = env[key]
  }
  return originEnv
}
