import React, { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";
// import components
import playIcon from "../css/images/icons/play.png";
import pauseIcon from "../css/images/icons/pause.png";
import rewind from "../css/images/icons/rewind.png";
import forward from "../css/images/icons/forward.png";
import comment from "../css/images/icons/comment.png";
import like from "../css/images/icons/like.png";
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
function niceTime(time) {
  time = Math.trunc(time);
  var hours = Math.trunc(time / 3600);
  var mins = Math.trunc((time % 3600) / 60);
  var secs = Math.trunc(time % 60);
  var goodTym = "";
  if (hours > 0) goodTym += hours + ":";
  if (mins > 0) goodTym += mins + ":";
  else if (mins > 0 && hours > 0) goodTym += "00" + ":";
  else goodTym = "00:";
  if (secs > 0) {
    if (secs < 10) goodTym += "0";
    goodTym += secs;
  } else goodTym += "00";
  return goodTym;
}
export default function Player({ player, pod_ep }) {
  // console.log(player.playing);

  var ep_link;
  if (player.length > 0) {
    ep_link = pod_ep.rssFeed;
  }
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth * 0.48,
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
        width: window.innerWidth * 0.48,
      });
    };
    var audioelement = $(".audioHere")[0];

    // Update the time for the timeline when audio is playing
    if (audioelement !== undefined) {
      audioelement.ontimeupdate = function () {
        setPctPlayed(audioelement.currentTime / audioelement.duration);
        if (audioelement.paused) {
          $(".playPause img:first").attr("src", playIcon);
        } else {
          $(".playPause img:first").attr("src", pauseIcon);
        }
        var elem = $("#timeUpdate");
        elem.html(
          `${niceTime(audioelement.currentTime)}<br/>${niceTime(
            audioelement.duration
          )}`
        );
      };
    }

    $("#timeline").on("click", function (e) {
      var goToPct =
        (e.offsetX - $(document).width() * 0.48 * 0.03) /
        ($(document).width() * 0.48 * 0.95);
      console.log(goToPct);
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    });

    // When a user drags the timeline back and forth
    document.ondrag = function (e) {
      var goToPct =
        (e.offsetX - $(document).width() * 0.48 * 0.03) /
        ($(document).width() * 0.48 * 0.95);
      console.log(goToPct);
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    };

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
    $(document).ready(() => {
      var audioelement = $(".audioHere")[0];
      var elem = $("#timeUpdate");
      if (audioelement != undefined) {
        elem.html(
          `${niceTime(audioelement.currentTime)}<br/>${niceTime(
            audioelement.duration
          )}`
        );
      }
    });
  }, [player]);

  return player.playing.map((p) => (
    <div className="player">
      <div className="playingTtl">
        <div className="podArt">
          <img src={p.image}></img>
        </div>
        <div className="nowPlaying">
          <p>{p.title}</p>
        </div>
      </div>
      <div className="icon playPause" draggable="true" onClick={playPause}>
        <img src={playIcon} />
      </div>
      <div className="icon seekBack">
        <img src={rewind} />
      </div>
      <div className="icon" id="timeUpdate"></div>

      <div className="progressBar">
        <Timeline
          id="timeline"
          height="40"
          width={dimensions.width}
          pct={pctPlayed}
        />
        <ReactAudioPlayer
          src={p.enclosure.url}
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
  ));
}
