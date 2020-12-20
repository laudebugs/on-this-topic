import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

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
    width: window.innerWidth,
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
    console.log(player);

    // the default volume will be 0.5
    onSetVolume(0.5);
    if (audioelement !== undefined) {
      audioelement.volume = player.volume;
      // console.log(audioelement.volume);
    }
    onPlayPause();
  }, [playThis]);

  useEffect(() => {
    /**
     * Change the size of the player when the window resizes
     */
    window.onresize = function () {
      setDimensions({
        height: 40,
        width: window.innerWidth,
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
      var goToPct = e.offsetX / $(document).width();
      if (audioelement !== undefined) {
        var goTo = goToPct * audioelement.duration;
        // set the current time to the percentage of XValue/page width
        audioelement.currentTime = goTo;
        setPctPlayed(audioelement.currentTime / audioelement.duration);
        console.log();
      }
    });

    /**
     * When a user drags the timeline back and forth
     */
    $("#timeline").ondrag = function (e) {
      var goToPct = e.offsetX / $(document).width();
      var goTo = goToPct * audioelement.duration;
      // set the current time to the percentage of XValue/page width
      audioelement.currentTime = goTo;
      setPctPlayed(audioelement.currentTime / audioelement.duration);
    };
  }, [player]);

  /**
   * Forward 15 seconds
   */
  function forward15Secs() {
    audioelement.currentTime = audioelement.currentTime + 15;
  }

  /**
   * Rewind 15 seconds
   */
  function back15Secs() {
    audioelement.currentTime = audioelement.currentTime - 15;
  }

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
    let timeline = $("#timeline")[0];
    timeline.style.display = "none";
  });

  /**
   * Set the volume level
   */
  $("#volumeBar").on("mouseleave", (e) => {
    var bar = $("#volumeBar")[0];
    bar.style.animation = "hideVBar 0.3s";
    bar.style.bottom = "-110px";
    let timeline = $("#timeline")[0];
    timeline.style.display = "";
  });

  function changeVolLevel(e) {
    let bar = $(".volumeBar")[0];
    let maxHeight = bar.height.animVal.value;
    let h = maxHeight - (e.clientY - $(".volumeBar").offset().top);
    let level = h / maxHeight;
    onSetVolume(level);
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
          <div className="progressBar">
            <Timeline
              id="timeline"
              height="40"
              width={dimensions.width}
              pct={pctPlayed}
            />
          </div>
          <div className="controls">
            <ReactAudioPlayer
              src={playThis.episode.sourceUrl}
              autoPlay={false}
              className="audioHere"
              volume={player.volume}
            />

            <span onClick={back15Secs}>
              <Rewind15 />
            </span>
            <PlayIcon />
            <span onClick={forward15Secs}>
              <Forward15 />
            </span>
            <div className="icon" id="timeUpdate"></div>
            <div className="podArt">
              <img
                alt={playThis.episode.title}
                src={playThis.episode.image}
              ></img>
            </div>
            <div className="playingTtl">
              <Link to={`/podcast/episode/${playThis.episode.slug}`}>
                <div className="nowPlaying">
                  <p>{playThis.episode.title}</p>
                </div>
              </Link>
            </div>
            <Volume volume={player.volume} />
            <Conversation />
            <span>
              <Like />
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
});
