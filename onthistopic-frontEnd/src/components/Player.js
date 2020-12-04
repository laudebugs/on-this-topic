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
import { setVolume } from "../components/actions";
import Volume from "./icons/Volume";
// import Helper Functions
const HelperFuncs = require("./HelperFuncs");

const mapStateToProps = (state) => ({
  player: getPlayer(state),
});
const mapDispatchToProps = (dispatch) => ({
  onPlayPause: () => dispatch(playPause()),
  onSetVolume: (volume) => dispatch(setVolume(volume)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Player({ player, onPlayPause, onSetVolume }) {
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
  var bar = $("#volumeBar")[0];
  if (bar !== undefined)
    bar.style.left = `${$("#volume").offset().left - 10}px`;
  // Whenever the link for a new podcast episode changes
  useEffect(() => {
    setPctPlayed(0);
    if (audioelement !== undefined) audioelement.volume = player.volume;
    onPlayPause();
  }, [playThis]);

  useEffect(() => {
    /**
     * Change the size of the player when the window resizes
     */
    window.onresize = function () {
      setDimensions({
        height: 40,
        width: window.innerWidth * 0.48,
      });
    };

    /**
     * Update the time for the timeline when audio is playing
     */
    if (audioelement !== undefined) {
      audioelement.ontimeupdate = function () {
        setPctPlayed(audioelement.currentTime / audioelement.duration);
        var element = $("#timeUpdate");
        element.html(
          `${HelperFuncs.niceTime(
            audioelement.currentTime
          )}<br/>${HelperFuncs.niceTime(audioelement.duration)}`
        );
      };
    }
    /**
     * When a use clicks on the timeline
     */
    $("#timeline").on("click", function (e) {
      var goToPct =
        (e.offsetX - $(document).width() * 0.48 * 0.03) /
        ($(document).width() * 0.48 * 0.95);
      if (audioelement !== undefined) {
        var goTo = goToPct * audioelement.duration;
        // set the current time to the percentage of XValue/page width
        audioelement.currentTime = goTo;
        setPctPlayed(audioelement.currentTime / audioelement.duration);
      }
    });

    /**
     * When a user drags the timeline back and forth
     */
    $("#timeline").ondrag = function (e) {
      var goToPct =
        (e.offsetX - $(document).width() * 0.48 * 0.03) /
        ($(document).width() * 0.48 * 0.95);
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    };
  }, [player]);

  /**
   * Forward 15 seconds
   */
  $("div.seekForward").on("click", function (e) {
    e.preventDefault();
    const ct = audioelement.currentTime;
    audioelement.currentTime = ct + 15;
  });

  /**
   * Rewind 15 seconds
   */
  $("div.seekBack").on("click", function (e) {
    audioelement.currentTime = audioelement.currentTime - 15;
  });

  /**
   * Listen for when the user wants to pause by pressing the keyboard
   * To toggle pause and play
   */
  document.onkeypress = function (e) {
    if (e.key === " " && e.target === document.body) {
      if (player.playingSth) onPlayPause();
      e.preventDefault();
    }
  };
  /**
   * A function to update the time on the timeline
   */
  var elem = $("#timeUpdate");
  if (audioelement !== undefined) {
    elem.html(
      `${HelperFuncs.niceTime(
        audioelement.currentTime
      )}<br/>${HelperFuncs.niceTime(audioelement.duration)}`
    );
  }
  /**
   * Display the volume bar when hovering over the volume icon
   */
  $("#volume").on("mouseover", (e) => {
    var bar = $("#volumeBar")[0];
    bar.style.position = "fixed ";
    // bar.style.display = "block";
    bar.style.animation = "showVBar 0.3s";
    bar.style.bottom = "80px";
  });

  /**
   * Set the volume level
   */
  $("#volumeBar").on("mouseleave", (e) => {
    var bar = $("#volumeBar")[0];
    bar.style.animation = "hideVBar 0.3s";
    bar.style.bottom = "-110px";
  });

  function changeVolLevel(e) {
    let bar = $(".volumeBar")[0];
    let maxHeight = bar.height.animVal.value;
    let h = maxHeight - (e.clientY - $(".volumeBar").offset().top);
    let level = h / maxHeight;
    audioelement.volume = level;
    // console.log(audioelement.volume);
    console.log("changing vol level");
    if (level !== player.volume) {
      onSetVolume(level);
    }
  }
  /**
   * Resize the volumeBar when a user resizes the screen
   */
  $(window).on("resize", () => {
    var bar = $("#volumeBar")[0];
    if (bar !== undefined)
      bar.style.left = `${$("#volume").offset().left - 5}px`;
  });
  /**
   * The component holding the volume bar
   */
  let volumeBar = (
    <div id="volumeBar">
      <svg
        onClick={(e) => {
          console.log(e);
          changeVolLevel(e);
        }}
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
          y={800 - 800 * player.volume}
          width="80"
          height={800 * player.volume}
          rx="30"
          ry="30"
        />
      </svg>
    </div>
  );

  /**
   * Only render the player component if there is something being played
   */
  if (player.playingSth === true) {
    return (
      <div>
        {volumeBar}
        <div className="player">
          <ReactAudioPlayer
            src={playThis.sourceUrl}
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
          <Volume volume={player.volume} />
          <Conversation />
          <Like />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
});
