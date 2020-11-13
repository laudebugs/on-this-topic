import * as React from "react";

export default function Timeline(props) {
  return (
    <svg width={props.width} height={props.height * 2} {...props}>
      <path
        stroke="#0292b7"
        strokeWidth={5}
        d={`M${props.width * 0.05} ${props.height}h${props.width * 0.9}`}
      />
      <circle
        cx={props.width * 0.05 + props.width * props.pct}
        cy={props.height}
        r={10}
        stroke="#000"
        strokeWidth={3}
        fill="#050A30"
      />
      <path
        stroke="#050a30"
        strokeWidth={5}
        d={`M${props.width * 0.05} ${props.height}h${props.width * props.pct}`}
      />
    </svg>
  );
}
