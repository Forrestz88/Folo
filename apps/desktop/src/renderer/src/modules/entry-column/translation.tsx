import { cn } from "@follow/utils/utils"
import { useMemo } from "react"

import { useGeneralSettingKey } from "~/atoms/settings/general"
import { HTML } from "~/components/ui/markdown/HTML"

export const EntryTranslation: Component<{
  source?: string | null
  target?: string
  isHTML?: boolean
}> = ({ source, target, className, isHTML }) => {
  const showTranslation = useGeneralSettingKey("translation")

  const nextTarget = useMemo(() => {
    if (!target || !showTranslation || source === target) {
      return ""
    }
    return target
  }, [source, target, showTranslation])

  if (!source) {
    return null
  }

  return (
    <div>
      {isHTML ? (
        <>
          {nextTarget && (
            <>
              <HTML
                as="div"
                className={cn("prose dark:prose-invert align-middle", className)}
                noMedia
              >
                {nextTarget}
              </HTML>
              <i className="i-mgc-translate-2-cute-re mb-4 mt-1 align-middle" />
            </>
          )}
          <HTML as="div" className={cn("prose dark:prose-invert align-middle", className)} noMedia>
            {source}
          </HTML>
        </>
      ) : (
        <div className={cn("inline align-middle", className)}>
          {nextTarget && (
            <>
              <span className="align-middle">{nextTarget}</span>
              <i className="i-mgc-translate-2-cute-re mr-2 align-middle" />
            </>
          )}
          <span className="align-middle">{source}</span>
        </div>
      )}
    </div>
  )
}
