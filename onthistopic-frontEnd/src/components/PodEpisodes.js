import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EpisodePlayer from "./EpisodePlayer";
const HelperFuncs = require("./HelperFuncs");

// Podcast takes a prop value which is the id of the podcast
export default function Podcast({ episodes }) {
  var eps = useState([]);

  if (episodes === undefined) eps = [];
  else eps = episodes;
  useEffect(() => {
    eps = episodes;
  }, []);
  function printEpisodes() {
    return eps.map((episode) => (
      <div className="episode">
        <EpisodePlayer episode={episode} />
        <div>
          <Link to={`/podcast/episode/${episode.slug}`}>
            <h4>{episode.title}</h4>
          </Link>
          <p>
            {episode.datePublished.substring(0, 16)} |{" "}
            {HelperFuncs.toHrsMins(episode.duration)}
          </p>
        </div>
      </div>
    ));
  }

  return <div className="episodeList">{printEpisodes()} </div>;
}
