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

export default function Player(ep_link) {
  const [dimensions, setDimensions] = React.useState({
    height: $(document).height(),
    width: $(document).width() * 0.48,
  });
  const [pctPlayed, setPctPlayed] = React.useState({
    pctPlayed: 0,
  });

  // Whenever the link for a new podcast episode changes
  React.useEffect(() => {
    setPctPlayed(0);
  }, [ep_link]);

  React.useEffect(() => {
    // Change the size of the player when the window resizes
    window.onresize = function () {
      console.log("resizing");
      setDimensions({
        height: 40,
        width: $(document).width() * 0.48,
      });
    };
    var audioelement = $(".audioHere")[0];

    // Update the time for the timeline when audio is playing
    audioelement.ontimeupdate = function () {
      setPctPlayed(audioelement.currentTime / audioelement.duration);
      if (audioelement.paused) {
        $(".playPause img:first").attr("src", playIcon);
      } else {
        $(".playPause img:first").attr("src", pauseIcon);
      }
    };

    $("#timeline").on("click", function (e) {
      // console.log(e.offsetX);
      var goToPct = e.offsetX / ($(document).width() * 0.48 * 0.95);
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    });

    // When a user drags the timeline back and forth
    /*
    $("#timeline")
      .on("mousedown mousemove touchstart", function (e) {
        console.log(e);
        var startX = e.offsetX;

        var goToPct = e.offsetX / ($(document).width() * 0.48 * 0.95);
        var goTo = goToPct * audioelement.duration;
        // set the current time to the percentage of XValue/page width
        audioelement.currentTime = goTo;
        setPctPlayed(audioelement.currentTime / audioelement.duration);
      })
      .bind("mouseup mouseleave touchend", function () {
        console.log("left"  );
      });
      */

    // Forward 15 seconds
    $("div.seekForward").on("click", function (e) {
      e.preventDefault();
      audioelement.currentTime = audioelement.currentTime + 15;
      return;
    });
    // Back 15 seconds
    $("div.seekBack").on("click", function (e) {
      audioelement.currentTime = audioelement.currentTime - 15;
    });
  });
  function setCurrentTime(x) {}

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
          src="https://sphinx.acast.com/kiffe-ta-race/super-macroncontrelanti-france/media.mp3"
          autoPlay={false}
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
