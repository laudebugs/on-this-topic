import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import playIcon from "../css/images/icons/play.png";
import pauseIcon from "../css/images/icons/pause.png";

import $ from "jquery";
import PodElement from "./PodElement";

// Podcast takes a prop value which is the id of the podcast
export default function Podcast({ podImage, episodes }) {
  var eps = useState([]);

  if (episodes === undefined) eps = [];
  else eps = episodes;
  useEffect(() => {
    console.log(episodes);
    eps = episodes;
  }, []);
  console.log(episodes);
  function printEpisodes() {
    return eps.map((ep) => (
      <PodElement key={ep.enclosure.url} image={podImage} episode={ep} />
    ));
  }

  return <div className="episodeList">{printEpisodes()} </div>;
}
