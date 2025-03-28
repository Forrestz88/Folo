import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface CelebrateCuteReIconProps {
  width?: number
  height?: number
  color?: string
}

export const CelebrateCuteReIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: CelebrateCuteReIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M12 2.201c-.238.111-.347.217-.469.459-.124.241-.131.551-.023.892.059.186.072.362.071.948-.002.641-.014.771-.111 1.184a11.668 11.668 0 0 1-.582 1.764c-.257.6-.222.938.133 1.294.24.241.466.321.808.286.549-.057.806-.411 1.255-1.728.53-1.556.658-3.075.357-4.24-.164-.635-.452-.909-.975-.931-.222-.009-.323.007-.464.072m5.85 2.76c-.242.049-.451.208-.938.713-.375.387-.437.471-.494.668-.14.481.068.954.521 1.189.212.11.616.114.841.009.207-.096 1.104-.992 1.198-1.197.101-.219.098-.594-.006-.823a1.004 1.004 0 0 0-1.122-.559m-2.937 2.853c-.207.077-.376.221-1.001.854-.617.624-.71.775-.71 1.152 0 .563.414.977.98.979.388.002.552-.106 1.265-.829.342-.346.653-.691.691-.765a1.17 1.17 0 0 0 .067-.709 1.072 1.072 0 0 0-.465-.598c-.222-.13-.601-.169-.827-.084m-7.933.227c-.684.137-1.306.597-1.77 1.309-.513.787-.913 1.832-2.332 6.09-.78 2.34-.962 3.085-.972 3.98-.007.592.054.899.266 1.337.475.981 1.514 1.472 2.805 1.326.937-.106 1.778-.343 4.523-1.276 3.3-1.121 3.716-1.275 4.52-1.669 1.15-.564 1.75-1.228 1.929-2.134.171-.868-.165-1.758-1.086-2.872-.466-.563-4.436-4.534-4.995-4.995-1.114-.92-2.032-1.268-2.888-1.096m10.991.901c-.34.17-.532.49-.53.887a.977.977 0 0 0 .578.896c.236.107 1.287.107 1.521 0a.982.982 0 0 0 .578-.905.926.926 0 0 0-.281-.697c-.244-.244-.383-.281-1.059-.282-.566-.001-.615.005-.807.101M7.811 10.12c.486.243 1.144.845 3.411 3.127 1.013 1.019 1.99 2.032 2.171 2.251.341.412.607.876.607 1.057-.001.369-.553.721-1.96 1.248-.749.281-3.4 1.195-4.784 1.65-1.889.621-2.825.788-3.164.565-.378-.248-.255-1.115.476-3.338.93-2.828 1.8-5.256 2.098-5.856.391-.787.655-.949 1.145-.704m7.789 1.522c-.337.041-.526.124-.716.314-.399.399-.355 1.123.089 1.461.275.21.34.22 1.29.195 1.304-.034 2.029.094 2.894.511.461.222.664.267.906.202.75-.202 1.02-1.126.485-1.658-.204-.203-.851-.529-1.392-.701a8.447 8.447 0 0 0-1.63-.325c-.471-.047-1.538-.046-1.926.001"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
