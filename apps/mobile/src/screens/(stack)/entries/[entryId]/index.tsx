import { FeedViewType } from "@follow/constants"
import { PortalProvider } from "@gorhom/portal"
import { atom, useAtomValue } from "jotai"
import { useEffect, useMemo } from "react"
import { Pressable, Text, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useGeneralSettingKey } from "@/src/atoms/settings/general"
import { BottomTabBarHeightContext } from "@/src/components/layouts/tabbar/contexts/BottomTabBarHeightContext"
import { SafeNavigationScrollView } from "@/src/components/layouts/views/SafeNavigationScrollView"
import { EntryContentWebView } from "@/src/components/native/webview/EntryContentWebView"
import { openLink } from "@/src/lib/native"
import type { NavigationControllerView } from "@/src/lib/navigation/types"
import { EntryContentContext, useEntryContentContext } from "@/src/modules/entry-content/ctx"
import { EntryAISummary } from "@/src/modules/entry-content/EntryAISummary"
import { useEntry, usePrefetchEntryContent } from "@/src/store/entry/hooks"
import { entrySyncServices } from "@/src/store/entry/store"
import type { EntryWithTranslation } from "@/src/store/entry/types"
import { useFeed } from "@/src/store/feed/hooks"
import { useEntryTranslation } from "@/src/store/translation/hooks"
import { useAutoMarkAsRead } from "@/src/store/unread/hooks"

import { EntrySocialTitle, EntryTitle } from "../../../../modules/entry-content/EntryTitle"

export const EntryDetailScreen: NavigationControllerView<{
  entryId: string
  view: FeedViewType
}> = ({ entryId, view: viewType }) => {
  usePrefetchEntryContent(entryId)
  useAutoMarkAsRead(entryId)
  const entry = useEntry(entryId)
  const translation = useEntryTranslation(entryId)
  const entryWithTranslation = useMemo(() => {
    if (!entry) return entry
    return {
      ...entry,
      translation,
    } as EntryWithTranslation
  }, [entry, translation])

  const insets = useSafeAreaInsets()
  const ctxValue = useMemo(
    () => ({
      showAISummaryAtom: atom(entry?.settings?.summary || false),
      showAITranslationAtom: atom(!!entry?.settings?.translation || false),
      showReadabilityAtom: atom(entry?.settings?.readability || false),
    }),
    [entry?.settings?.readability, entry?.settings?.summary, entry?.settings?.translation],
  )

  useEffect(() => {
    if (entry?.settings?.readability) {
      entrySyncServices.fetchEntryReadabilityContent(entryId)
    }
  }, [entry?.settings?.readability, entryId])

  return (
    <EntryContentContext.Provider value={ctxValue}>
      <PortalProvider>
        <BottomTabBarHeightContext.Provider value={insets.bottom}>
          <SafeNavigationScrollView
            automaticallyAdjustContentInsets={false}
            className="bg-system-background"
          >
            <Pressable onPress={() => entry?.url && openLink(entry.url)} className="relative py-4">
              {({ pressed }) => (
                <>
                  {pressed && (
                    <Animated.View
                      entering={FadeIn}
                      exiting={FadeOut}
                      className={"bg-system-fill absolute inset-x-1 inset-y-0 rounded-xl"}
                    />
                  )}
                  {viewType === FeedViewType.SocialMedia ? (
                    <EntrySocialTitle entryId={entryId as string} />
                  ) : (
                    <>
                      <EntryTitle title={entry?.title || ""} entryId={entryId as string} />
                      <EntryInfo entryId={entryId as string} />
                    </>
                  )}
                </>
              )}
            </Pressable>
            <EntryAISummary entryId={entryId as string} />
            {entryWithTranslation && (
              <View className="mt-3">
                <EntryContentWebViewWithContext entry={entryWithTranslation} />
              </View>
            )}
            {viewType === FeedViewType.SocialMedia && (
              <View className="mt-2">
                <EntryInfoSocial entryId={entryId as string} />
              </View>
            )}
          </SafeNavigationScrollView>
        </BottomTabBarHeightContext.Provider>
      </PortalProvider>
    </EntryContentContext.Provider>
  )
}

const EntryContentWebViewWithContext = ({ entry }: { entry: EntryWithTranslation }) => {
  const { showReadabilityAtom, showAITranslationAtom } = useEntryContentContext()
  const showReadability = useAtomValue(showReadabilityAtom)
  const translationSetting = useGeneralSettingKey("translation")
  const showTranslation = useAtomValue(showAITranslationAtom)
  return (
    <EntryContentWebView
      entry={entry}
      showReadability={showReadability}
      showTranslation={translationSetting || showTranslation}
    />
  )
}

const EntryInfo = ({ entryId }: { entryId: string }) => {
  const entry = useEntry(entryId)

  if (!entry) return null

  const { publishedAt } = entry

  return (
    <View className="mt-4 px-4">
      <FeedInfo feedId={entry.feedId as string} />
      <Text className="text-label text-sm leading-tight">
        {publishedAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
      </Text>
    </View>
  )
}

const EntryInfoSocial = ({ entryId }: { entryId: string }) => {
  const entry = useEntry(entryId)

  if (!entry) return null
  const { publishedAt } = entry
  return (
    <View className="mt-3 px-4">
      <Text className="text-secondary-label">
        {publishedAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
      </Text>
    </View>
  )
}

const FeedInfo = ({ feedId }: { feedId: string }) => {
  const feed = useFeed(feedId)
  if (!feed) return null
  return (
    <View className="mb-2">
      <Text className="text-label text-sm leading-tight">{feed.title?.trim()}</Text>
    </View>
  )
}
