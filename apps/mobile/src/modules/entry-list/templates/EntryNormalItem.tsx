import { FeedViewType } from "@follow/constants"
import { router } from "expo-router"
import { useCallback, useEffect } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import ReAnimated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

import { useUISettingKey } from "@/src/atoms/settings/ui"
import { preloadWebViewEntry } from "@/src/components/native/webview/EntryContentWebView"
import { RelativeDateTime } from "@/src/components/ui/datetime/RelativeDateTime"
import { FeedIcon } from "@/src/components/ui/icon/feed-icon"
import { ProxiedImage } from "@/src/components/ui/image/ProxiedImage"
import { ItemPressable } from "@/src/components/ui/pressable/ItemPressable"
import { gentleSpringPreset } from "@/src/constants/spring"
import { PauseCuteFiIcon } from "@/src/icons/pause_cute_fi"
import { PlayCuteFiIcon } from "@/src/icons/play_cute_fi"
import { getAttachmentState, player } from "@/src/lib/player"
import { useEntry } from "@/src/store/entry/hooks"
import { useFeed } from "@/src/store/feed/hooks"

import { EntryItemContextMenu } from "../../context-menu/entry"
import { EntryItemSkeleton } from "../EntryListContentArticle"
import { useEntryListContextView } from "../EntryListContext"

export function EntryNormalItem({ entryId, extraData }: { entryId: string; extraData: string }) {
  const entry = useEntry(entryId)
  const feed = useFeed(entry?.feedId as string)
  const view = useEntryListContextView()

  const handlePress = useCallback(() => {
    if (!entry) return
    preloadWebViewEntry(entry)
    router.push(`/entries/${entryId}`)
  }, [entryId, entry])

  const unreadZoomSharedValue = useSharedValue(entry?.read ? 0 : 1)

  const unreadIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: unreadZoomSharedValue.value,
        },
      ],
    }
  })

  useEffect(() => {
    if (!entry) return

    if (entry.read) {
      unreadZoomSharedValue.value = withSpring(0, gentleSpringPreset)
    } else {
      unreadZoomSharedValue.value = withSpring(1, gentleSpringPreset)
    }
  }, [entry, entry?.read, unreadZoomSharedValue])

  const thumbnailRatio = useUISettingKey("thumbnailRatio")
  if (!entry) return <EntryItemSkeleton />
  const { title, description, publishedAt, media, attachments } = entry

  const coverImage = media?.[0]

  const image = coverImage?.url
  const blurhash = coverImage?.blurhash

  const audio = attachments?.find((attachment) => attachment.mime_type?.startsWith("audio/"))
  const audioState = getAttachmentState(extraData, audio)
  const isPlaying = audioState === "playing"
  const isLoading = audioState === "loading"

  const durationInSeconds = attachments ? attachments[0]?.duration_in_seconds : 0
  const estimatedMins = durationInSeconds ? Math.floor(durationInSeconds / 60) : undefined

  return (
    <EntryItemContextMenu id={entryId}>
      <ItemPressable className="flex flex-row items-center p-4 pl-6" onPress={handlePress}>
        <ReAnimated.View
          className="bg-red absolute left-2 top-[43] size-2 rounded-full"
          style={unreadIndicatorStyle}
        />

        <View className="flex-1 space-y-2">
          <View className="mb-1 flex-1 flex-row items-center gap-1.5 pr-2">
            <FeedIcon fallback feed={feed} size={16} />
            <Text numberOfLines={1} className="text-secondary-label shrink text-sm font-medium">
              {feed?.title ?? "Unknown feed"}
            </Text>
            <Text className="text-secondary-label text-xs font-medium">·</Text>
            {estimatedMins && (
              <>
                <Text className="text-secondary-label text-xs font-medium">
                  {formatEstimatedMins(estimatedMins)}
                </Text>
                <Text className="text-secondary-label text-xs font-medium">·</Text>
              </>
            )}
            <RelativeDateTime
              date={publishedAt}
              className="text-secondary-label text-xs font-medium"
              postfixText="ago"
            />
          </View>
          {!!title && (
            <Text numberOfLines={2} className="text-label text-lg font-semibold">
              {title.trim()}
            </Text>
          )}
          {view !== FeedViewType.Notifications && !!description && (
            <Text numberOfLines={2} className="text-secondary-label text-sm">
              {description}
            </Text>
          )}
        </View>
        {view !== FeedViewType.Notifications && (
          <View className="relative ml-2">
            {image &&
              (thumbnailRatio === "square" ? (
                <ProxiedImage
                  proxy={{
                    width: 96,
                    height: 96,
                  }}
                  source={{
                    uri: image,
                  }}
                  placeholder={{ blurhash }}
                  className="bg-system-fill size-24 rounded-md"
                  contentFit="cover"
                  recyclingKey={image}
                  transition={500}
                />
              ) : (
                <AspectRatioImage
                  blurhash={blurhash}
                  image={image}
                  height={coverImage?.height}
                  width={coverImage?.width}
                />
              ))}

            {audio && (
              <TouchableOpacity
                className="absolute inset-0 flex items-center justify-center"
                onPress={() => {
                  if (isLoading) return
                  if (isPlaying) {
                    player.pause()
                    return
                  }
                  player.play({
                    url: audio.url,
                    title: entry?.title,
                    artist: feed?.title,
                    artwork: image,
                  })
                }}
              >
                <View className="bg-gray-6/50 rounded-full p-2">
                  {isPlaying ? (
                    <PauseCuteFiIcon color="white" width={24} height={24} />
                  ) : isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <PlayCuteFiIcon color="white" width={24} height={24} />
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ItemPressable>
    </EntryItemContextMenu>
  )
}

const AspectRatioImage = ({
  image,
  blurhash,
  height = 96,
  width = 96,
}: {
  image: string
  blurhash?: string
  height?: number
  width?: number
}) => {
  // Calculate aspect ratio and determine dimensions
  // Ensure the larger dimension is capped at 96px while maintaining aspect ratio

  const aspect = height / width
  let scaledWidth, scaledHeight

  if (aspect > 1) {
    // Image is taller than wide
    scaledHeight = 96
    scaledWidth = scaledHeight / aspect
  } else {
    // Image is wider than tall or square
    scaledWidth = 96
    scaledHeight = scaledWidth * aspect
  }

  return (
    <View className="size-24 items-center justify-center">
      <View
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
        className="overflow-hidden rounded-md"
      >
        <ProxiedImage
          proxy={{
            width: 96,
          }}
          source={{
            uri: image,
          }}
          style={{
            width: scaledWidth,
            height: scaledHeight,
          }}
          placeholder={{ blurhash }}
          className="bg-system-fill"
          contentFit="cover"
          recyclingKey={image}
          transition={500}
        />
      </View>
    </View>
  )
}

const formatEstimatedMins = (estimatedMins: number) => {
  const minutesInHour = 60
  const minutesInDay = minutesInHour * 24
  const minutesInMonth = minutesInDay * 30

  const months = Math.floor(estimatedMins / minutesInMonth)
  const days = Math.floor((estimatedMins % minutesInMonth) / minutesInDay)
  const hours = Math.floor((estimatedMins % minutesInDay) / minutesInHour)
  const minutes = estimatedMins % minutesInHour

  if (months > 0) {
    return `${months}M ${days}d`
  }
  if (days > 0) {
    return `${days}d ${hours}h`
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${estimatedMins} mins`
}
