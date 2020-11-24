import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Header from "../components/Header";
import PodEpisodes from "../components/PodEpisodes";
import Player from "../components/Player";
// Podcast takes a prop value which is the id of the podcast
export default function Podcast() {
  let { slug } = useParams();
  let [podcast, setPodcast] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/podcast/${slug}`);
      const body = await result.json();

      setPodcast(body);
    };
    fetchData();
  }, [slug]);
  function parsethisHtml(this_html) {
    var element;
    $("document").ready(function () {
      element = document.createElement("div");
      element.innerHTML = `${this_html}`;
      $("#target").html(element);
    });
    return element;
  }

  return (
    <div>
      <Header />
      <div className="podInfo">
        <div>
          <img src={podcast.image} alt={podcast.title} />
        </div>
        <div className="description">
          <h2>{podcast.title}</h2>
          <div id="target">{parsethisHtml(podcast.description)}</div>
        </div>
      </div>
      <div className="podEpisodes">
        <PodEpisodes rss_feed={podcast.rssFeed} />
      </div>
      <Player />
    </div>
  );
}
