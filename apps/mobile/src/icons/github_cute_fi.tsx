import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface GithubCuteFiIconProps {
  width?: number
  height?: number
  color?: string
}

export const GithubCuteFiIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: GithubCuteFiIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M5.1 2.094c-.407.19-.686.645-.82 1.335-.176.911-.2 1.943-.061 2.646l.059.296-.243.363a6.308 6.308 0 0 0-.941 2.251c-.096.489-.096 1.541 0 2.03.338 1.708 1.409 3.215 3.064 4.311.464.307 1.339.762 1.802.936.165.062.314.124.332.139.017.015-.003.115-.045.223a4.293 4.293 0 0 0-.23 1.062l-.027.306-.172.026c-.305.046-.951.026-1.189-.037-.576-.151-.937-.465-1.568-1.361-.532-.757-.971-1.192-1.433-1.421-.567-.281-.949-.258-1.32.077-.215.194-.306.405-.307.714-.002.427.219.759.62.93.228.098.384.263.8.842.507.705.862 1.117 1.184 1.374.846.674 1.634.926 2.805.898l.59-.015v.564c0 .675.052.872.299 1.118.311.312.157.299 3.701.299 3.546 0 3.389.013 3.702-.3.305-.305.306-.315.288-2.449-.015-1.746-.022-1.892-.101-2.191a4.586 4.586 0 0 0-.149-.475c-.036-.086-.051-.168-.033-.184.018-.015.186-.087.373-.16a11.114 11.114 0 0 0 1.763-.916c1.616-1.07 2.689-2.554 3.041-4.207.118-.552.128-1.596.022-2.133a6.233 6.233 0 0 0-.931-2.235c-.26-.391-.263-.398-.221-.563.151-.608.152-1.628.001-2.515-.29-1.709-.955-2.02-2.849-1.333a9.253 9.253 0 0 0-1.656.772l-.41.245-.43-.097c-.806-.181-1.356-.234-2.41-.234-1.056 0-1.604.053-2.414.235l-.433.097-.407-.245a8.862 8.862 0 0 0-1.652-.773c-.98-.356-1.595-.431-1.994-.245"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
