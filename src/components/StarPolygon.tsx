import type { CSSProperties, SVGProps } from "react";

const STAR_PATH =
  "M62.1351 4.59263L62.1642 4.6024L62.1944 4.60852L74.7363 7.15539L83.213 16.7436L83.2333 16.7667L83.2564 16.787L92.8446 25.2637L95.3915 37.8056L95.3976 37.8358L95.4074 37.8649L99.4727 50L95.4074 62.1351L95.3976 62.1642L95.3915 62.1944L92.8446 74.7363L83.2564 83.213L83.2333 83.2333L83.213 83.2564L74.7363 92.8446L62.1944 95.3915L62.1642 95.3976L62.1351 95.4074L50 99.4727L37.8649 95.4074L37.8358 95.3976L37.8056 95.3915L25.2637 92.8446L16.787 83.2564L16.7667 83.2333L16.7436 83.213L7.15539 74.7363L4.60852 62.1944L4.6024 62.1642L4.59263 62.1351L0.527312 50L4.59263 37.8649L4.6024 37.8358L4.60852 37.8056L7.1554 25.2637L16.7436 16.787L16.7667 16.7667L16.787 16.7436L25.2637 7.1554L37.8056 4.60852L37.8358 4.6024L37.8649 4.59263L50 0.527312L62.1351 4.59263Z";

type StarPolygonProps = SVGProps<SVGSVGElement> & {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  shadow?: boolean;
  shadowStyle?: CSSProperties;
};

export const StarPolygon = ({
  fill = "#FFFF41",
  stroke = "black",
  strokeWidth = 1,
  shadow = false,
  shadowStyle,
  className = "",
  ...props
}: StarPolygonProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`overflow-visible ${className}`}
      {...props}
    >
      {shadow && (
        <path
          d={STAR_PATH}
          fill="black"
          opacity="0.25"
          transform="translate(10 10)"
          style={shadowStyle}
        />
      )}
      <path
        d={STAR_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default StarPolygon;
