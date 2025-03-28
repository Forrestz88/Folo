import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Github2CuteFiIconProps {
  width?: number
  height?: number
  color?: string
}

export const Github2CuteFiIcon = ({
  width = 24,
  height = 24,
  color = "#10161F",
}: Github2CuteFiIconProps) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Path
        d="M11.28 2.024c-2.109.185-3.979.926-5.561 2.201-1.675 1.351-2.908 3.28-3.416 5.346-.216.881-.277 1.41-.277 2.429s.061 1.548.277 2.429c.886 3.607 3.839 6.502 7.457 7.311.844.189 1.287.236 2.24.236.953 0 1.396-.047 2.24-.236 3.618-.809 6.571-3.704 7.457-7.311.213-.869.276-1.413.278-2.409.001-.976-.043-1.404-.235-2.26-.458-2.049-1.658-4.025-3.26-5.369-1.824-1.531-3.915-2.321-6.26-2.368a15.89 15.89 0 0 0-.94.001m-2.5 4.054c.421.101.795.245 1.262.485l.382.196.318-.067c.451-.095 2.015-.096 2.498-.001l.339.066.421-.215c.231-.118.618-.282.86-.365.383-.132.489-.152.82-.154.319-.003.407.011.545.085.549.294.802 1.026.766 2.212l-.018.58.172.3c.358.623.512 1.196.509 1.9a3.575 3.575 0 0 1-.514 1.895c-.452.771-1.231 1.466-2.135 1.905l-.33.16.033.2c.049.305.02 3.327-.034 3.532-.062.235-.345.542-.581.633a1.001 1.001 0 0 1-1.292-.552c-.087-.202-.088-.231-.076-1.769.014-1.714.025-1.628-.235-1.919-.358-.4-.388-.906-.077-1.314.162-.212.369-.331.715-.41 1.854-.423 2.948-1.839 2.378-3.078a3.123 3.123 0 0 0-.3-.475 4.072 4.072 0 0 1-.268-.393c-.109-.21-.117-.479-.023-.787.047-.154.085-.318.085-.365v-.085l-.17.087a4.656 4.656 0 0 0-.39.234c-.393.264-.638.298-1.153.161-.715-.19-1.724-.206-2.407-.039-.701.172-.969.145-1.352-.134a3.066 3.066 0 0 0-.358-.223L9 8.278v.089c0 .048.038.223.084.388.132.469.077.694-.276 1.125-.676.827-.606 1.8.188 2.601.463.468 1.107.805 1.876.98.346.079.553.198.715.41.311.408.281.914-.077 1.314-.259.29-.248.212-.272 1.955-.018 1.38-.03 1.62-.088 1.745a1.02 1.02 0 0 1-.919.608c-.626.001-1.088-.569-1.021-1.26.018-.19.017-.193-.098-.193-.259 0-.751-.132-1.068-.286-.398-.194-.834-.599-1.043-.97-.18-.319-.332-.483-.56-.607-.464-.253-.568-.779-.23-1.163.249-.284.583-.331.973-.136.288.145.537.392.956.953.364.486.578.649.895.68l.195.018.023-.614c.013-.338.035-.669.048-.735.024-.117.016-.124-.305-.28-1.346-.653-2.299-1.769-2.582-3.026-.081-.36-.091-1.166-.019-1.474.126-.538.316-1.007.554-1.366.081-.123.095-.18.073-.298-.049-.26-.026-1.067.039-1.411.09-.473.204-.751.392-.955.339-.367.694-.445 1.327-.292"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
