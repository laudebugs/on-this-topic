import React, { useState, useEffect } from "react";

import PodElement from "./PodElement";

// Podcast takes a prop value which is the id of the podcast
export default function Podcast({ podImage, episodes }) {
  var eps = useState([]);

  if (episodes === undefined) eps = [];
  else eps = episodes;
  useEffect(() => {
    eps = episodes;
  }, []);
  function printEpisodes() {
    return eps.map((ep) => (
      <PodElement key={ep.enclosure.url} image={podImage} episode={ep} />
    ));
  }

  return <div className="episodeList">{printEpisodes()} </div>;
}
