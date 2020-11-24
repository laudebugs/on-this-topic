import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import playIcon from "../css/images/icons/play.png";
import pauseIcon from "../css/images/icons/pause.png";

import $ from "jquery";
import PodElement from "./PodElement";

// Podcast takes a prop value which is the id of the podcast
export default function Podcast({ rss_feed }) {
  console.log(rss_feed);
  // let rss_feed = podcast.rssFeed;
  let [episodes, setEpisodes] = useState([]);
  let [podImage, setPodImage] = useState("");
  useEffect(() => {
    //Get the podcast episodes from the rss_feed
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let parser = new Parser();
    console.log();
    // let rssFeed = rss_feed.rssFeed;
    parser.parseURL(CORS_PROXY + rss_feed, function (err, feed) {
      if (err) console.log(err);
      else if (feed !== undefined) {
        console.log(feed);
        // setPodImage(feed.image);
        setEpisodes(feed.items.slice(0, 10));
      }
    });
  }, [rss_feed]);

  function printEpisodes() {
    console.log(episodes);
    return episodes.map((ep) => <PodElement episode={ep} />);
  }

  return <div className="episodeList">{printEpisodes()} </div>;
}
