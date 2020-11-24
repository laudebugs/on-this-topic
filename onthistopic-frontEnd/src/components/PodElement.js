import React, { useState, useEffect } from "react";
import playIcon from "../css/images/icons/play.png";
import pauseIcon from "../css/images/icons/pause.png";
import { connect } from "react-redux";
import { playEpisode } from "./actions";
import { pausePlay } from "./actions";
import $ from "jquery";

const mapStateToProps = (state) => ({
  player: state.player,
});
const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (episode) => dispatch(playEpisode(episode)),
  onPause: (pause) => dispatch(pausePlay(pause)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function PodElement({ player, onCreatePressed, onPause, image, episode }) {
  episode.image = image.url;
  const [isPlaying, setIsPlaying] = useState({ isPlaying: false });
  const [icon, setIcon] = useState({ icon: playIcon });
  useEffect(() => {
    if (player.playing[0] === episode) {
      console.log("playing this");
      setIsPlaying(true);
      if (player.pause) {
        console.log(player.pause);
      }
      var audioelement = $(".audioHere")[0];
      if (!audioelement.paused) {
        // then play
        setIcon(pauseIcon);
        audioelement.play();
      } else if (audioelement.paused) {
        setIcon(playIcon);
      }
    } else {
      setIsPlaying(false);
      setIcon(playIcon);
    }
  }, [player, episode]);

  $(document).ready(function () {
    $("img.playPod").click(function (e) {
      if (player.playing.length > 0) {
        console.log("pressed");

        var audioelement = $(".audioHere")[0];
        console.log(audioelement.paused);
        if (!audioelement.paused) {
          audioelement.play();
          // $(this).attr("src", playIcon);
        } else {
          audioelement.pause();
          // $(this).attr("src", pauseIcon);
        }
      }
    });
  });

  return (
    <div className="episode">
      <div className="icon">
        <img
          onClick={() => {
            onCreatePressed(episode);
          }}
          className="playPod"
          src={icon}
        />
      </div>
      <div>
        <h4>{episode.title}</h4>
        <p>{episode.pubDate}</p>
      </div>
    </div>
  );
});
