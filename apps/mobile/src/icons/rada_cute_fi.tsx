import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface RadaCuteFiIconProps {
  width?: number
  height?: number
  color?: string
}

export const RadaCuteFiIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: RadaCuteFiIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M5.076 4.254c-.276.114-.461.261-.798.635C2.926 6.387 2.081 8.054 1.705 9.96a11.17 11.17 0 0 0 .014 4.16 10.477 10.477 0 0 0 2.715 5.151c.422.434.644.543 1.146.562.295.011.402-.002.591-.073.303-.113.654-.437.811-.747.107-.212.118-.269.118-.633 0-.534-.08-.702-.618-1.304-1.396-1.561-2.09-3.511-1.961-5.516a6.791 6.791 0 0 1 .435-2.112c.325-.911.829-1.745 1.527-2.527.539-.604.617-.769.617-1.301 0-.364-.011-.421-.118-.633-.155-.306-.509-.634-.802-.744-.317-.118-.801-.114-1.104.011m12.733-.01c-.283.11-.641.448-.791.743-.107.212-.118.269-.118.633 0 .534.08.702.618 1.304 1.423 1.591 2.11 3.568 1.957 5.636a7.558 7.558 0 0 1-1.925 4.48c-.597.665-.694.875-.662 1.436.024.408.161.689.479.984.323.299.582.391 1.053.373.502-.019.723-.127 1.145-.561a10.419 10.419 0 0 0 2.73-5.232A9.798 9.798 0 0 0 22.48 12c0-1.647-.308-3.038-.997-4.501-.626-1.328-1.851-2.92-2.472-3.21-.318-.149-.885-.17-1.202-.045m-9.69 2.77c-.307.066-.541.215-.842.534a6.483 6.483 0 0 0-1.719 3.639c-.07.525-.029 1.601.081 2.113.11.515.328 1.155.53 1.558.48.955 1.226 1.853 1.739 2.093.204.096.28.109.632.109.364 0 .421-.011.633-.118.31-.157.634-.508.747-.811.071-.189.084-.296.073-.591-.018-.458-.121-.688-.494-1.098-.688-.756-.989-1.508-.986-2.462.002-.903.291-1.637.928-2.36.136-.154.303-.397.373-.54.112-.233.126-.297.125-.62 0-.309-.016-.394-.112-.6a1.497 1.497 0 0 0-1.086-.856c-.281-.052-.335-.052-.622.01m7.059.039c-.288.074-.632.317-.82.58-.215.3-.292.578-.27.969.023.385.138.636.46.999.65.731.939 1.462.939 2.377 0 .93-.292 1.683-.941 2.422-.299.341-.406.528-.466.819a1.497 1.497 0 0 0 2.143 1.641c.335-.164.953-.862 1.345-1.52a6.32 6.32 0 0 0 .911-3.34c0-1.446-.412-2.705-1.265-3.868-.355-.483-.716-.838-.989-.972a1.673 1.673 0 0 0-1.047-.107m-3.807 2.522c-.874.221-1.641 1.023-1.812 1.895-.071.36-.033 1.048.075 1.347a2.65 2.65 0 0 0 1.549 1.553c.205.076.316.088.817.088.642 0 .831-.045 1.276-.308.283-.167.707-.591.874-.874.263-.445.308-.634.308-1.276 0-.501-.012-.612-.088-.817a2.652 2.652 0 0 0-1.553-1.55c-.297-.108-1.118-.141-1.446-.058"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
