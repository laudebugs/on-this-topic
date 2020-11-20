import React, { useState, useEffect } from "react";
import playIcon from "../css/images/icons/play.png";
import pauseIcon from "../css/images/icons/pause.png";

import $ from "jquery";

export default function PodElement({ episode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  var audioelement = $(".audioHere")[0];
  let icon = playIcon;
  useEffect(() => {
    icon = audioelement.paused ? playIcon : pauseIcon;
  }, [audioelement.src]);

  console.log("this was playing: " + audioelement.src);
  console.log("but play this: " + episode.enclosure.url);

  $(document).ready(function () {
    $("img.playPod").click(function () {
      console.log("this was playing: " + audioelement.src);
      console.log("but play this: " + episode.enclosure.url);

      var ep_link = $(this).parent().parent().attr("epLink");
      var current_link = audioelement.src;
      if (!isPlaying) {
        if (current_link !== ep_link) {
          audioelement.setAttribute("src", ep_link);
          // first set link to current link
          // then play
          $(this).attr("src", pauseIcon);
          audioelement.play();
          setIsPlaying(true);
        }
      } else if (!audioelement.paused()) {
        setIsPlaying(false);
        audioelement.pause();
        $(this).attr("src", playIcon);
      }
    });
  });

  return (
    <div className="episode" epLink={`${episode.enclosure.url}`}>
      <div className="icon">
        <img className="playPod" src={icon} />
      </div>
      <div>
        <h4>{episode.title}</h4>
        <p>{episode.pubDate}</p>
      </div>
    </div>
  );
}
