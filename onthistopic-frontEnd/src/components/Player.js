import React, { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";

import PlayIcon from "./icons/PlayIcon";
import Rewind15 from "./icons/Rewind15";
import Forward15 from "./icons/Forward15";
import Conversation from "./icons/Conversation";
import Like from "./icons/Like";
import Timeline from "./Timeline";

export default function Player({ player }) {
  const playThis = player.player.playing;
  // console.log(playThis);
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
  }, [player]);
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
      const ct = audioelement.currentTime;

      console.log(ct);
      console.log(ct + 15);
      audioelement.currentTime = ct + 15;
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

  if (player.player.playingSth === true) {
    return (
      <div className="player">
        <ReactAudioPlayer
          src={playThis.enclosure.url}
          autoPlay={false}
          className="audioHere"
        />
        <div className="playingTtl">
          <div className="podArt">
            <img src={playThis.image}></img>
          </div>
          <div className="nowPlaying">
            <p>{playThis.title}</p>
          </div>
        </div>
        <PlayIcon />
        <Rewind15 />
        <div className="icon" id="timeUpdate"></div>

        <div className="progressBar">
          <Timeline
            id="timeline"
            height="40"
            width={dimensions.width}
            pct={pctPlayed}
          />
        </div>
        <Forward15 />
        <Conversation />
        <Like />
      </div>
    );
  } else {
    return <div></div>;
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
