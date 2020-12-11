import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getPlayer } from "../selectors";
const mapStateToProps = (state) => ({
  player: getPlayer(state),
});
const mapDispatchToProps = (dispatch) => ({
  // onPlayPause: () => dispatch(playPause()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Like({ player }) {
  // console.log(like);

  const [liked, setLiked] = useState();
  const [saved, setSaved] = useState();
  async function getLike() {
    let request = await fetch(
      `/api/like/episode/${player.playing.episode._id}`
    );
    let status = await request.json();
    setLiked(status.liked);
  }
  useEffect(() => {
    getLike();
  }, [player.playing.episode]);

  let noFill = { fill: "none" };
  let fill = { fill: "#050a30" };

  return (
    <div
      className="icon like"
      onClick={async () => {
        const options = {
          method: "POST",
          body: JSON.stringify({ podcastId: player.playing.episode._id }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        let res = await fetch(`/api/like/episode`, options);
        let isLiked = await res.json();
        console.log(isLiked);
        setLiked(isLiked.liked);
        setSaved(isLiked.saved);
      }}
    >
      <svg viewBox="0 0 375 375">
        <g id="like">
          <path
            style={liked ? fill : noFill}
            d="M 271.875 20.625 C 217.59375 20.625 187.5 59.8125 187.5 59.8125 C 187.5 59.8125 157.40625 20.625 103.125 20.625 C 46.164062 20.625 0 66.789062 0 123.75 C 0 211.59375 136.050781 319.855469 176.363281 350.007812 C 183 354.976562 191.980469 354.976562 198.617188 350.007812 C 238.949219 319.855469 375 211.59375 375 123.75 C 375 66.789062 328.835938 20.625 271.875 20.625 Z M 271.875 20.625 "
          />
        </g>
      </svg>
    </div>
  );
});
