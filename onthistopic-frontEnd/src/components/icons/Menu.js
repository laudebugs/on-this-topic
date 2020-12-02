import React, { useState, useEffect } from "react";
import $ from "jquery";
export default function Forward15() {
  var [angle, setAngle] = useState(0);

  function openMenu() {
    var t = angle === 0 ? 45 : 0;
    setAngle(t);
  }
  return (
    <div
      onClick={() => {
        openMenu();
      }}
      className="icon"
      id="logo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <line
          transform={`rotate(${angle}, 150, 150)`}
          stroke-width="25"
          stroke="black"
          x1="100"
          x2="400"
          y1="100"
          y2="100"
        />
        <line
          stroke-width="25"
          stroke="black"
          x1="100"
          x2="400"
          y1="200"
          y2="200"
        />
        <line
          transform={`rotate(-${angle}, 150, 250)`}
          stroke-width="25"
          stroke="black"
          x1="100"
          x2="400"
          y1="300"
          y2="300"
        />
      </svg>
    </div>
  );
}
