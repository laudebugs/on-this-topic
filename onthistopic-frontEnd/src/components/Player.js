import React from "react";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";

// import components
import playIcon from "../css/images/icons/play.png";
import pauseIcon from "../css/images/icons/pause.png";
import rewind from "../css/images/icons/rewind.png";
import forward from "../css/images/icons/forward.png";
import comment from "../css/images/icons/comment.png";
import like from "../css/images/icons/like.png";
import timeline from "../css/images/timeline.svg";
import Timeline from "./Timeline";

function playPause() {
  var audioelement = $(".audioHere")[0];
  if (audioelement.paused) {
    audioelement.play();

    $(".playPause img:first").attr("src", pauseIcon);
    console.log(audioelement);
  } else {
    $(".playPause img:first").attr("src", playIcon);
    audioelement.pause();
  }
}
/**
 * Obtained from an article titled: "Re-render a React Component on Window Resize"
 * by Jake Trent: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
 */
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default function Player() {
  const [dimensions, setDimensions] = React.useState({
    height: $(document).height(),
    width: $(document).width(),
  });
  const [pctPlayed, setPctPlayed] = React.useState({
    pctPlayed: 0,
  });

  React.useEffect(() => {
    window.onresize = function () {
      console.log("resizing");
      setDimensions({
        height: 40,
        width: $(document).width() * 0.48,
      });
    };
  });
  React.useEffect(() => {
    var audioelement = $(".audioHere")[0];

    audioelement.ontimeupdate = function () {
      // console.log()
      console.log(audioelement.currentTime);
      console.log(audioelement.duration);
      console.log($("#timeline")[0].innerHTML);
      console.log($(document).width());
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    };
  });
  return (
    <div className="player">
      <div className="playingTtl"></div>
      <div className="icon playPause" onClick={playPause}>
        <img src={playIcon} />
      </div>
      <div className="icon seekBack">
        <img src={rewind} />
      </div>
      <div className="progressBar">
        <Timeline
          id="timeline"
          height="40"
          width={dimensions.width}
          pct={pctPlayed}
        />
        <ReactAudioPlayer
          src="https://edge2.pod.npr.org/anon.npr-podcasts/podcast/npr/ted/2020/11/20201105_ted_zero_emissions_future-eb2a2def-0491-469e-9c40-f27a162a717a.mp3/20201105_ted_zero_emissions_future-eb2a2def-0491-469e-9c40-f27a162a717a.mp3_964d5bc15b245011eb66619dd0281cc0_51090691.mp3?awCollectionId=510298&awEpisodeId=931842071&orgId=1&d=3152&p=510298&story=931842071&t=podcast&e=931842071&size=50322900&ft=pod&f=510298&hash_redirect=1&x-total-bytes=51090691&x-ais-classified=download&listeningSessionID=0CD_382_316__4d727fbe4df4780cee013f1b30c2dc25bc9ce180"
          autoPlay={false}
          controls={false}
          className="audioHere"
        />
      </div>
      <div className="icon seekForward">
        <img src={forward} />
      </div>
      <div className="icon comment">
        <img src={comment} />
      </div>
      <div className="icon like">
        <img src={like} />
      </div>
    </div>
  );
}
