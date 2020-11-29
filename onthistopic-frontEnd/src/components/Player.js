import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";
import { connect } from "react-redux";

import PlayIcon from "./icons/PlayIcon";
import Rewind15 from "./icons/Rewind15";
import Forward15 from "./icons/Forward15";
import Conversation from "./icons/Conversation";
import Like from "./icons/Like";
import Timeline from "./Timeline";
import { getPlayer } from "./selectors";
import { playPause } from "../components/thunks";
import Volume from "./icons/Volume";
// import Helper Functions
const HelperFuncs = require("./HelperFuncs");

const mapStateToProps = (state) => ({
  player: getPlayer(state),
});
const mapDispatchToProps = (dispatch) => ({
  onPlayPause: () => dispatch(playPause()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Player({ player, onPlayPause }) {
  const playThis = player.playing;

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth * 0.48,
  });
  const [pctPlayed, setPctPlayed] = useState({
    pctPlayed: 0,
  });
  // Target the audio element
  var audioelement = $(".audioHere")[0];
  useEffect(() => {
    // if (audioelement !== undefined) audioelement.volume = 0.1;
    console.log("changing");
  }, [player]);

  // Whenever the link for a new podcast episode changes
  useEffect(() => {
    setPctPlayed(0);
    onPlayPause();
  }, [playThis]);

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

  useEffect(() => {
    // Change the size of the player when the window resizes
    window.onresize = function () {
      console.log("resizing");
      setDimensions({
        height: 40,
        width: window.innerWidth * 0.48,
      });
    };

    // Update the time for the timeline when audio is playing
    if (audioelement !== undefined) {
      audioelement.ontimeupdate = function () {
        setPctPlayed(audioelement.currentTime / audioelement.duration);
        var elem = $("#timeUpdate");
        elem.html(
          `${HelperFuncs.niceTime(
            audioelement.currentTime
          )}<br/>${HelperFuncs.niceTime(audioelement.duration)}`
        );
      };
    }

    $("#timeline").on("click", function (e) {
      var goToPct =
        (e.offsetX - $(document).width() * 0.48 * 0.03) /
        ($(document).width() * 0.48 * 0.95);
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    });

    // When a user drags the timeline back and forth
    $("#timeline").ondrag = function (e) {
      var goToPct =
        (e.offsetX - $(document).width() * 0.48 * 0.03) /
        ($(document).width() * 0.48 * 0.95);
      console.log(goToPct);
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    };
  }, [player]);

  // Forward 15 seconds
  $("div.seekForward").on("click", function (e) {
    e.preventDefault();
    const ct = audioelement.currentTime;
    audioelement.currentTime = ct + 15;
  });

  // Back 15 seconds
  $("div.seekBack").on("click", function (e) {
    audioelement.currentTime = audioelement.currentTime - 15;
  });

  // Listen for when the user wants to pause by pressing the keyboard
  document.onkeypress = function (e) {
    e.preventDefault();
    if (e.key === " " && e.target === document.body) {
      if (player.playingSth) onPlayPause();
    }
  };

  var elem = $("#timeUpdate");
  if (audioelement !== undefined) {
    elem.html(
      `${HelperFuncs.niceTime(
        audioelement.currentTime
      )}<br/>${HelperFuncs.niceTime(audioelement.duration)}`
    );
  }
  $("#volume").on("mouseover", (e) => {
    var audioelement = $(".audioHere")[0];
    if (audioelement !== undefined) {
      var element = $("#volume");
      console.log(e.pageX);
    }
    var bar = $("#volumeBar")[0];
    bar.style.position = "fixed ";
    bar.style.display = "block";
    bar.style.left = e.pageX - e.offsetX + "px";
  });
  function func(e) {
    let bar = $(".volumeBar")[0];
    console.log(bar);
    let maxHeight = bar.height.animVal.value;
    let h = maxHeight - e.offsetY;
    let level = h / maxHeight;
    audioelement.volume = level;
    doThings();
    setLevel(level);
    console.log("here");
  }
  $("#volumeBar").on("click", func);
  function doThings() {
    document.removeEventListener("click", func);
  }
  $("#volumeBar").on("mouseleave", (e) => {
    var bar = $("#volumeBar")[0];
    bar.style.display = "none";
  });
  let volumeBar = (
    <div id="volumeBar">
      <svg
        className="volumeBar icon"
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
  // console.log(audioelement.volume);
  if (player.playingSth === true) {
    return (
      <div>
        {volumeBar}
        <div className="player">
          <ReactAudioPlayer
            src={playThis.enclosure.url}
            autoPlay={false}
            className="audioHere"
            volume="1"
          />
          <div className="playingTtl">
            <div className="podArt">
              <img alt={playThis.title} src={playThis.image}></img>
            </div>
            <div className="nowPlaying">
              <p>{playThis.title}</p>
            </div>
          </div>
          <PlayIcon />
          <div className="icon" id="timeUpdate"></div>
          <Rewind15 />

          <div className="progressBar">
            <Timeline
              id="timeline"
              height="40"
              width={dimensions.width}
              pct={pctPlayed}
            />
          </div>
          <Forward15 />
          <Volume />
          <Conversation />
          <Like />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
});
