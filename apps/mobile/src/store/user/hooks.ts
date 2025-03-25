import { identifyUserOpenPanel, tracker } from "@follow/tracker"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { apiClient } from "@/src/lib/api-fetch"
import { kv } from "@/src/lib/kv"
import { useNavigation } from "@/src/lib/navigation/hooks"
import { op } from "@/src/lib/op"
import { OnboardingScreen } from "@/src/screens/onboarding"

import { isNewUserQueryKey, isOnboardingFinishedStorageKey } from "./constants"
import { userSyncService, useUserStore } from "./store"

export const whoamiQueryKey = ["user", "whoami"]

export const usePrefetchSessionUser = () => {
  const query = useQuery({
    queryKey: whoamiQueryKey,
    queryFn: () => userSyncService.whoami(),
  })

  useEffect(() => {
    if (query.data) {
      const user = query.data
      identifyUserOpenPanel(user, op.identify.bind(op))
      tracker.identify(user.id)
    }
  }, [query.data])
  return query
}

export const useWhoami = () => {
  return useUserStore((state) => state.whoami)
}

export const useUser = (userId?: string) => {
  return useUserStore((state) => (userId ? state.users[userId] : undefined))
}

export function useIsNewUser(enabled = true) {
  const { data } = useQuery({
    enabled,
    queryKey: isNewUserQueryKey,
    queryFn: async () => {
      const isOnboardingFinished = await kv.get(isOnboardingFinishedStorageKey)
      if (isOnboardingFinished) {
        return false
      }

      const subscriptions = await apiClient.subscriptions.$get({ query: {} })
      return subscriptions.data.length < 5
    },
  })
  return !!data
}

export function useOnboarding() {
  const whoami = useWhoami()
  const isNewUser = useIsNewUser(!!whoami)
  const navigation = useNavigation()
  useEffect(() => {
    if (isNewUser) {
      navigation.presentControllerView(OnboardingScreen, undefined, "transparentModal")
    }
  }, [isNewUser, navigation])
}
