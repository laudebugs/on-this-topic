import React, { useState, useEffect } from "react";
import $ from "jquery";
export default function Menu({ angle }) {
  // var [angle, setAngle] = useState(0);
  const hoverColor = "#0292b7";
  const normalColor = "#050a30";
  function hoverFn() {
    $(".menuButton svg line").css({ stroke: hoverColor, strokeWidth: 30 });
  }
  function leaveHover() {
    $(".menuButton svg line").css({ stroke: normalColor, "stroke-width": 25 });
  }
  return (
    <div
      onMouseOver={() => hoverFn()}
      onMouseLeave={() => leaveHover()}
      className="icon menuButton"
      id="logo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <line
          transform={`rotate(${angle}, 150, 150)`}
          stroke-width="25"
          x1="100"
          x2="400"
          y1="100"
          y2="100"
        />
        <line stroke-width="25" x1="100" x2="400" y1="200" y2="200" />
        <line
          transform={`rotate(-${angle}, 150, 250)`}
          stroke-width="25"
          x1="100"
          x2="400"
          y1="300"
          y2="300"
        />
      </svg>
    </div>
  );
}
