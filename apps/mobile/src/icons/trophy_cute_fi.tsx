import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface TrophyCuteFiIconProps {
  width?: number
  height?: number
  color?: string
}

export const TrophyCuteFiIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: TrophyCuteFiIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M9.54 3.002c-.886.025-1.044.04-1.385.13-1.309.344-2.378 1.337-2.791 2.593l-.087.266-.669.019c-.55.016-.71.034-.905.105-.658.238-1.106.688-1.335 1.341-.16.458-.14.836.106 2.029.112.542.246 1.101.297 1.242a3.462 3.462 0 0 0 2.412 2.163l.363.086.133.242c1.032 1.885 2.822 3.214 4.887 3.629l.434.087V19H9.427c-1.789 0-1.836.006-2.128.299a.984.984 0 0 0 0 1.402c.317.317.038.299 4.701.299 4.663 0 4.384.018 4.701-.299.18-.18.299-.459.299-.701 0-.242-.119-.521-.299-.701-.292-.293-.339-.299-2.128-.299H13v-2.066l.43-.085a7.216 7.216 0 0 0 4.845-3.554l.175-.318.365-.087a3.457 3.457 0 0 0 2.414-2.163c.051-.141.184-.7.296-1.242.246-1.196.266-1.575.107-2.029a2.125 2.125 0 0 0-1.335-1.341c-.195-.071-.355-.089-.903-.105l-.666-.019-.126-.351a4.017 4.017 0 0 0-2.757-2.507c-.347-.09-.503-.103-1.565-.134a93.683 93.683 0 0 0-4.74.003M4.986 8.013c.004.004-.02.214-.053.467s-.072.793-.086 1.2l-.027.74-.124-.26c-.17-.353-.242-.64-.355-1.406-.1-.683-.095-.732.072-.768.074-.016.553.007.573.027m14.72.036c.042.042.033.173-.045.698-.119.791-.19 1.077-.354 1.413l-.127.26-.025-.74a11.38 11.38 0 0 0-.137-1.547c-.019-.119-.012-.129.111-.146.204-.029.521.006.577.062"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
