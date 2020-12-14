import * as React from "react";

export default function Timeline(props) {
  var percent = props.pct;
  if (isNaN(percent)) {
    percent = 0;
  }
  return (
    <svg viewBox={`0 0 ${props.width} ${props.height / 2}`} {...props}>
      <path
        stroke="#0292b7"
        strokeWidth={5}
        d={`M${props.width * 0.0} ${props.height / 2}h${props.width}`}
      />
      <circle
        cx={props.width * 0.0 + props.width * percent}
        cy={props.height / 2}
        r={7.5}
        stroke="#050a30"
        strokeWidth={3}
        fill="#050A30"
      />
      <path
        id="scrubber"
        stroke="#050a30"
        strokeWidth={5}
        d={`M${props.width * 0.0} ${props.height / 2}h${props.width * percent}`}
      />
    </svg>
  );
}
