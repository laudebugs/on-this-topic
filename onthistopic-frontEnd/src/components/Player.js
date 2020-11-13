import React from "react";
import ReactAudioPlayer from "react-audio-player";
import play from "../css/images/icons/play.png";
import pause from "../css/images/icons/pause.png";
import rewind from "../css/images/icons/rewind.png";
import forward from "../css/images/icons/forward.png";
import comment from "../css/images/icons/comment.png";
import like from "../css/images/icons/like.png";

const Player = () => (
  <div className="player">
    <div className="playingTtl"></div>
    <div className="icon playPause">
      <img src={play} />
    </div>
    <div className="icon seekBack">
      <img src={rewind} />
    </div>
    <div className="progressBar">
      <ReactAudioPlayer
        src="https://edge2.pod.npr.org/anon.npr-podcasts/podcast/npr/ted/2020/11/20201105_ted_zero_emissions_future-eb2a2def-0491-469e-9c40-f27a162a717a.mp3/20201105_ted_zero_emissions_future-eb2a2def-0491-469e-9c40-f27a162a717a.mp3_964d5bc15b245011eb66619dd0281cc0_51090691.mp3?awCollectionId=510298&awEpisodeId=931842071&orgId=1&d=3152&p=510298&story=931842071&t=podcast&e=931842071&size=50322900&ft=pod&f=510298&hash_redirect=1&x-total-bytes=51090691&x-ais-classified=download&listeningSessionID=0CD_382_316__4d727fbe4df4780cee013f1b30c2dc25bc9ce180"
        autoPlay="false"
        controls=""
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

export default Player;
