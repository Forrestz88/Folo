import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface RightCuteReIconProps {
  width?: number
  height?: number
  color?: string
}

export const RightCuteReIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: RightCuteReIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M8.891 5.462c-.488.243-.675.839-.421 1.341.094.186.161.251.47.455.198.132.567.382.82.558 1.466 1.015 2.949 2.518 3.899 3.954l.152.23-.152.23c-.949 1.434-2.434 2.94-3.899 3.954-.253.176-.622.426-.82.558-.309.204-.376.269-.47.455-.343.676.12 1.445.868 1.442.305-.001.435-.06 1.1-.498a17.43 17.43 0 0 0 4.59-4.388c.634-.883.772-1.196.772-1.753 0-.557-.138-.87-.772-1.753a17.733 17.733 0 0 0-3.596-3.69c-.555-.418-1.452-1.014-1.686-1.12a1.066 1.066 0 0 0-.855.025"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
