import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface LayoutLeftbarCloseCuteReIconProps {
  width?: number
  height?: number
  color?: string
}

export const LayoutLeftbarCloseCuteReIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: LayoutLeftbarCloseCuteReIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M8.3 2.545c-2.312.151-3.352.488-4.289 1.389-.827.794-1.235 1.838-1.419 3.626-.074.714-.074 8.166 0 8.88.18 1.748.549 2.725 1.342 3.549.794.827 1.838 1.235 3.626 1.419.714.074 8.166.074 8.88 0 1.748-.18 2.725-.549 3.549-1.342.676-.65 1.107-1.562 1.307-2.766.153-.92.164-1.266.164-5.3 0-4.114-.01-4.407-.18-5.381-.389-2.221-1.594-3.462-3.768-3.879-.943-.181-1.187-.19-5.192-.199-2.101-.005-3.91-.004-4.02.004m7.68 2.015c1.358.103 2.169.357 2.636.824.473.473.718 1.267.831 2.696.067.855.067 6.981 0 7.84-.113 1.428-.357 2.223-.831 2.696-.467.467-1.278.721-2.636.824-.753.058-5.942.098-6.016.047-.039-.027-.071-.225-.108-.673-.299-3.594-.342-8.097-.114-11.954.081-1.368.157-2.274.198-2.34.026-.043.523-.048 2.756-.028 1.498.014 2.976.044 3.284.068m-8.089.141C7.673 7.638 7.6 9.471 7.6 12c0 2.316.097 4.859.256 6.772.028.334.044.621.036.637-.035.066-1.096-.106-1.555-.253-.787-.251-1.243-.706-1.493-1.493-.298-.933-.34-1.632-.34-5.663 0-3.362.024-4.094.161-4.92.07-.417.219-.931.344-1.18.081-.161.317-.475.43-.572.373-.32.951-.551 1.661-.664.771-.122.803-.121.791.037m7.3 4.233c-.194.073-.672.353-.951.559-.71.523-1.369 1.288-1.673 1.94-.088.189-.105.284-.105.567 0 .384.077.596.374 1.033A5.93 5.93 0 0 0 15 14.983c.288.15.691.161.944.028a.984.984 0 0 0 .536-.896c0-.432-.175-.676-.708-.989a5.048 5.048 0 0 1-.54-.382c-.26-.216-.672-.672-.672-.744 0-.072.412-.528.672-.744.148-.123.407-.303.576-.402.491-.285.672-.547.672-.974a.964.964 0 0 0-.917-.985.985.985 0 0 0-.372.039"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
