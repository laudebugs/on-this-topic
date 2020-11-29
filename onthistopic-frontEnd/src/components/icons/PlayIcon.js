import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPlayer } from "../selectors";
import { playPause } from "../thunks";

import $ from "jquery";

const PlayIcon = ({ player, onPlayPause }) => {
  var audioelement = $(".audioHere");
  const [element, setElement] = useState({ paused: true });
  useEffect(() => {
    if (audioelement.length > 0) setElement(audioelement[0]);
  }, [audioelement]);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(player.pause);
  }, [player.pause]);
  const Pause = (
    <div className="icon pause" onClick={() => onPlayPause()}>
      <svg viewBox="0 0 375 375">
        <g id="pauseIcon">
          <path d="M 327.421875 0.0546875 L 242.707031 0.0546875 C 230.597656 0.0546875 220.792969 9.859375 220.792969 21.957031 L 220.792969 353.035156 C 220.792969 365.132812 230.597656 374.9375 242.707031 374.9375 L 327.421875 374.9375 C 339.519531 374.9375 349.328125 365.132812 349.328125 353.035156 L 349.328125 21.957031 C 349.332031 9.859375 339.527344 0.0546875 327.421875 0.0546875 Z M 327.421875 0.0546875 " />
          <path d="M 132.304688 0.0546875 L 47.578125 0.0546875 C 35.480469 0.0546875 25.671875 9.859375 25.671875 21.957031 L 25.671875 353.042969 C 25.671875 365.140625 35.480469 374.945312 47.578125 374.945312 L 132.304688 374.945312 C 144.402344 374.945312 154.207031 365.140625 154.207031 353.042969 L 154.207031 21.957031 C 154.207031 9.859375 144.402344 0.0546875 132.304688 0.0546875 Z M 132.304688 0.0546875 " />
        </g>
      </svg>
    </div>
  );
  const Play = (
    <div
      className="icon playPause"
      draggable="true"
      onClick={() => onPlayPause()}
    >
      <svg viewBox="0 0 375 375">
        <g id="surface1">
          <path d="M 358.679688 160.542969 L 44.859375 4.953125 C 35.355469 0.164062 24.007812 0.683594 14.953125 6.179688 C 5.847656 11.652344 0.355469 21.414062 0.355469 31.886719 L 0.355469 343.160156 C 0.355469 353.609375 5.847656 363.347656 14.953125 368.84375 C 19.859375 371.816406 25.425781 373.324219 31.0625 373.324219 C 35.800781 373.324219 40.519531 372.242188 44.882812 370.070312 L 358.703125 214.433594 C 369.03125 209.292969 375.589844 198.914062 375.589844 187.476562 C 375.589844 176.039062 369.007812 165.683594 358.679688 160.542969 Z M 358.679688 160.542969 " />
        </g>
      </svg>
    </div>
  );
  return play ? Play : Pause;
};

const mapStateToProps = (state) => ({
  player: getPlayer(state),
});
const mapDispatchToProps = (dispatch) => ({
  onPlayPause: () => dispatch(playPause()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayIcon);
