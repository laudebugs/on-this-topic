import React from "react";
import ReactAudioPlayer from "react-audio-player";

const Player = () => (
  <div>
    <ReactAudioPlayer
      src="https://edge2.pod.npr.org/anon.npr-podcasts/podcast/npr/ted/2020/11/20201105_ted_zero_emissions_future-eb2a2def-0491-469e-9c40-f27a162a717a.mp3/20201105_ted_zero_emissions_future-eb2a2def-0491-469e-9c40-f27a162a717a.mp3_964d5bc15b245011eb66619dd0281cc0_51090691.mp3?awCollectionId=510298&awEpisodeId=931842071&orgId=1&d=3152&p=510298&story=931842071&t=podcast&e=931842071&size=50322900&ft=pod&f=510298&hash_redirect=1&x-total-bytes=51090691&x-ais-classified=download&listeningSessionID=0CD_382_316__4d727fbe4df4780cee013f1b30c2dc25bc9ce180"
      autoPlay="false"
      controls
    />
  </div>
);

export default Player;
