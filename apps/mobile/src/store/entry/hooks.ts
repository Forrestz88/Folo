import type { FeedViewType } from "@follow/constants"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"

import { getEntry } from "./getter"
import { entrySyncServices, useEntryStore } from "./store"
import type { EntryModel, FetchEntriesProps } from "./types"

export const usePrefetchEntries = (props: Omit<FetchEntriesProps, "pageParam"> | null) => {
  const { feedId, inboxId, listId, view, read, limit, isArchived } = props || {}
  return useInfiniteQuery({
    queryKey: ["entries", feedId, inboxId, listId, view, read, limit, isArchived],
    queryFn: ({ pageParam }) => entrySyncServices.fetchEntries({ ...props, pageParam }),
    getNextPageParam: (lastPage) =>
      inboxId || listId
        ? lastPage.data?.at(-1)?.entries.insertedAt
        : lastPage.data?.at(-1)?.entries.publishedAt,
    initialPageParam: undefined as undefined | string,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!props,
  })
}
export const usePrefetchEntryContent = (entryId: string) => {
  return useQuery({
    queryKey: ["entry", entryId],
    queryFn: () => entrySyncServices.fetchEntryContent(entryId),
  })
}

export const useEntry = (id: string): EntryModel | undefined => {
  return useEntryStore((state) => state.data[id])
}

function sortEntryIdsByPublishDate(a: string, b: string) {
  const entryA = getEntry(a)
  const entryB = getEntry(b)
  if (!entryA || !entryB) return 0
  return entryB.publishedAt.getTime() - entryA.publishedAt.getTime()
}

export const useEntryIdsByView = (view: FeedViewType) => {
  return useEntryStore(
    useCallback(
      (state) => {
        const ids = state.entryIdByView[view]
        if (!ids) return []
        return Array.from(ids).sort((a, b) => sortEntryIdsByPublishDate(a, b))
      },
      [view],
    ),
  )
}

export const useEntryIdsByFeedId = (feedId: string) => {
  return useEntryStore(
    useCallback(
      (state) => {
        const ids = state.entryIdByFeed[feedId]
        if (!ids) return []
        return Array.from(ids).sort((a, b) => sortEntryIdsByPublishDate(a, b))
      },
      [feedId],
    ),
  )
}

export const useEntryIdsByInboxId = (inboxId: string) => {
  return useEntryStore(
    useCallback(
      (state) => {
        const ids = state.entryIdByInbox[inboxId]
        if (!ids) return []
        return Array.from(ids).sort((a, b) => sortEntryIdsByPublishDate(a, b))
      },
      [inboxId],
    ),
  )
}

export const useEntryIdsByCategory = (category: string) => {
  return useEntryStore(
    useCallback(
      (state) => {
        const ids = state.entryIdByCategory[category]
        if (!ids) return []
        return Array.from(ids).sort((a, b) => sortEntryIdsByPublishDate(a, b))
      },
      [category],
    ),
  )
}

export const useFetchEntryContentByStream = (remoteEntryIds?: string[]) => {
  const { mutate: updateEntryContent } = useMutation({
    mutationKey: ["stream-entry-content", remoteEntryIds],
    mutationFn: entrySyncServices.fetchEntryContentByStream,
  })

  useEffect(() => {
    if (!remoteEntryIds) return
    updateEntryContent(remoteEntryIds)
  }, [remoteEntryIds, updateEntryContent])
}
