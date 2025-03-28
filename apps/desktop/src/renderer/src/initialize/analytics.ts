import { env } from "@follow/shared/env.desktop"
import type { AuthSession } from "@follow/shared/hono"
import { setOpenPanelTracker, tracker } from "@follow/tracker"

import { QUERY_PERSIST_KEY } from "~/constants/app"

import { op } from "./op"

export const initAnalytics = async () => {
  if (env.VITE_OPENPANEL_CLIENT_ID === undefined) return

  op.setGlobalProperties({
    build: ELECTRON ? "electron" : "web",
    version: APP_VERSION,
    hash: GIT_COMMIT_SHA,
  })

  setOpenPanelTracker(op)

  let session: AuthSession | undefined
  try {
    const queryData = JSON.parse(window.localStorage.getItem(QUERY_PERSIST_KEY) ?? "{}")
    session = queryData.clientState.queries.find(
      (query: any) => query.queryHash === JSON.stringify(["auth", "session"]),
    )?.state.data.data
  } catch {
    // do nothing
  }
  if (session?.user) {
    await tracker.identify(session.user)
  }
}
