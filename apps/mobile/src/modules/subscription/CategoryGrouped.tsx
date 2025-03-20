import { memo, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

import { ItemPressableStyle } from "@/src/components/ui/pressable/enum"
import { ItemPressable } from "@/src/components/ui/pressable/ItemPressable"
import { RightCuteFiIcon } from "@/src/icons/right_cute_fi"
import { useNavigation } from "@/src/lib/navigation/hooks"
import {
  closeDrawer,
  getHorizontalScrolling,
  selectFeed,
  useSelectedFeed,
} from "@/src/modules/screen/atoms"
import { FeedScreen } from "@/src/screens/(stack)/feeds/[feedId]"
import { useUnreadCounts } from "@/src/store/unread/hooks"
import { useColor } from "@/src/theme/colors"

import { SubscriptionFeedCategoryContextMenu } from "../context-menu/feeds"
import { GroupedContext } from "./ctx"
import { UnGroupedList } from "./UnGroupedList"

// const CategoryList: FC<{
//   grouped: Record<string, string[]>
// }> = ({ grouped }) => {
//   const sortedGrouped = useSortedGroupedSubscription(grouped, "alphabet")
//   return sortedGrouped.map(({ category, subscriptionIds }) => {
//     return <CategoryGrouped key={category} category={category} subscriptionIds={subscriptionIds} />
//   })
// }
export const CategoryGrouped = memo(
  ({ category, subscriptionIds }: { category: string; subscriptionIds: string[] }) => {
    const unreadCounts = useUnreadCounts(subscriptionIds)
    const [expanded, setExpanded] = useState(false)
    const rotateSharedValue = useSharedValue(0)
    const rotateStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotateSharedValue.value}deg` }],
      }
    }, [rotateSharedValue])

    const secondaryLabelColor = useColor("label")
    const selectedFeed = useSelectedFeed()
    const navigation = useNavigation()
    if (selectedFeed?.type !== "view") {
      return null
    }
    const view = selectedFeed.viewId

    return (
      <>
        <SubscriptionFeedCategoryContextMenu
          category={category}
          feedIds={subscriptionIds}
          view={view}
        >
          <ItemPressable
            itemStyle={ItemPressableStyle.Plain}
            onPress={() => {
              const isHorizontalScrolling = getHorizontalScrolling()
              if (isHorizontalScrolling) {
                return
              }
              selectFeed({
                type: "category",
                categoryName: category,
              })
              closeDrawer()
              navigation.pushControllerView(FeedScreen, {
                feedId: category,
              })
            }}
            className="h-12 flex-row items-center px-3"
          >
            <TouchableOpacity
              hitSlop={10}
              onPress={() => {
                rotateSharedValue.value = withSpring(expanded ? 0 : 90, {})
                setExpanded(!expanded)
              }}
              className="size-5 flex-row items-center justify-center"
            >
              <Animated.View style={rotateStyle} className="ml-2">
                <RightCuteFiIcon color={secondaryLabelColor} height={14} width={14} />
              </Animated.View>
            </TouchableOpacity>
            <Text className="text-text ml-4 font-medium">{category}</Text>
            {!!unreadCounts && (
              <Text className="text-secondary-label ml-auto text-xs">{unreadCounts}</Text>
            )}
          </ItemPressable>
        </SubscriptionFeedCategoryContextMenu>

        {expanded && (
          <GroupedContext.Provider value={category}>
            <UnGroupedList subscriptionIds={subscriptionIds} />
          </GroupedContext.Provider>
        )}
      </>
    )
  },
)
