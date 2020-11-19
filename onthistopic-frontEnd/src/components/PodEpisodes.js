import React, { useState, useEffect } from "react";
let Parser = require("rss-parser");

// Podcast takes a prop value which is the id of the podcast
export default function Podcast({ rss_feed }) {
  //  let { rss_fee} = useParams();
  let [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    //Get the podcast episodes from the rss_feed
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    console.log(rss_feed);
    let parser = new Parser();
    parser.parseURL(CORS_PROXY + rss_feed, function (err, feed) {
      if (err) console.log(err);
      else if (feed !== undefined) setEpisodes(feed.items);
    });
  }, [rss_feed]);
  console.log(episodes.length);

  const printEpisodes = () => {
    console.log(episodes);
    return episodes.map((ep) => (
      <div className="episode">
        <h4>{ep.title}</h4>
        <p>{ep.pubDate}</p>
      </div>
    ));
  };

  return <div className="episodeList">{printEpisodes()}</div>;
}
