import React, { useEffect, useState } from "react";

import $ from "jquery";
export default function Volume() {
  var audioelement = $(".audioHere")[0];
  const [level, setLevel] = useState(() => {
    if (audioelement !== undefined) return audioelement.volume;
    else return 1;
  });
  useEffect(() => {
    return () => {};
  }, [level]);

  const [volumeLevel, setVolumeLevel] = useState(level);
  useEffect(() => {
    console.log(level);
    setVolumeLevel(level);
  }, [level]);

  // $("#volume").hover((e) => {
  //   var audioelement = $(".audioHere")[0];
  //   if (audioelement !== undefined) {
  //     var element = $("#volume");
  //     console.log(e.pageX);
  //   }
  //   // var body = $("root");
  //   // body.append(volumeBar);
  //   // let bar = $("#volumeBar")[0];
  //   // bar.style.position = "absolute";
  //   // bar.style.left = 0 + "px";
  //   // bar.style.top = 0 + "px";
  // });

  let volumeBar = (
    <div className="volumeBar">
      <svg
        id="volumeBar icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 800"
      >
        <rect
          id="volumeBase"
          x="160"
          y="0"
          width="80"
          height="800"
          rx="30"
          ry="30"
        />
        <rect
          id="volumeLevel"
          x="160"
          y={800 - 800 * volumeLevel}
          width="80"
          height={800 * volumeLevel}
          rx="30"
          ry="30"
        />
      </svg>
    </div>
  );
  return (
    <div className="icon volumeIcon">
      {/* {volumeBar} */}
      <svg id="volume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375">
        <g id="surface1">
          <path
            d="M73.2,133.1H28.8v108.9h44.4l83.8,68.6c0,0,15.2,14.3,15.2-0.3c0-14.6,0-234,0-247.3c0-11.4-13.7-0.3-13.7-0.3
		L73.2,133.1z"
          />
          <path
            d="M219.9,111.8c-4.4-4.8-11.4-4.8-15.9,0s-4.4,12.7,0,17.5c14.6,16.2,21.6,36.8,21.9,57.8
		c0,21-7.3,41.9-21.9,58.1c-4.4,4.8-4.4,12.7,0,17.5c2.2,2.5,5.1,3.5,7.9,3.5c2.9,0,5.7-1.3,7.9-3.5c18.7-21,28.3-48.3,28.3-75.6
		C248.1,160,238.9,132.7,219.9,111.8z"
          />
          <path
            d="M250.4,72.7c-4.4-5.1-11.4-5.1-15.9,0c-4.4,4.8-4.4,12.7,0,17.5c24.4,27,36.5,61.9,36.5,97.1
		c0,35.2-12.1,70.5-36.5,97.5c-4.4,4.8-4.4,12.7,0,17.5c2.2,2.2,5.1,3.5,7.9,3.5c2.9,0,5.7-1.3,7.9-3.5
		c28.9-31.7,43.2-73.6,43.2-115.2C293.8,146.1,279.2,104.5,250.4,72.7z"
          />
          <path
            d="M288.1,32.7c-4.4-5.1-11.4-5.1-15.9,0c-4.4,4.8-4.4,12.7,0,17.5c34.6,38.1,51.7,87.6,51.7,137.1
		c0,49.8-17.1,99.7-51.7,137.8c-4.4,4.8-4.4,12.7,0,17.5c2.2,2.5,5.1,3.5,7.9,3.5c2.9,0,5.7-1.3,7.9-3.5
		c38.7-42.9,58.1-99,58.1-155.2C346.2,131.5,326.9,75.3,288.1,32.7z"
          />
        </g>
      </svg>
    </div>
  );
}
