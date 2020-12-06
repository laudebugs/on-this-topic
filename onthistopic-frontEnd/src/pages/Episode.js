import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import * as QueryString from "query-string";

import { connect } from "react-redux";
import { loadEpisode } from "../components/thunks";

import Header from "../components/Header";
import {
  getEpisode,
  getIsLoadingEpisode,
  getPodcast,
} from "../components/selectors";

const Episode = ({ podcast, episode, startLoadingEpisode }) => {
  const params = QueryString.parse(window.location.search);
  let { slug } = useParams();
  const [thisEp, setThisEp] = useState(episode);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    startLoadingEpisode(
      `${slug}?episode=${encodeURIComponent(params.episode)}`
    );
    setLoaded(true);
  }, [loaded]);
  if (episode.episode !== undefined) console.log(episode.episode.episode);
  function parsethisHtml(this_html) {
    var element;
    $("document").ready(function () {
      element = document.createElement("div");
      element.innerHTML = `${this_html}`;
      $("#target").html(element);
    });
    return element;
  }
  if (episode.episode !== undefined) {
    return (
      <div>
        <Header />
        <div className="podInfo">
          <div>
            <img
              src={episode.episode.episode.image}
              alt={episode.episode.episode.title}
            />
          </div>

          <div className="description">
            <h2>{episode.episode.episode.title}</h2>
            <div id="target">
              {parsethisHtml(episode.episode.episode.description)}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading Episode...</div>;
  }
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  episode: getEpisode(state),
  podcast: getPodcast(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingEpisode: (slug) => dispatch(loadEpisode(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Episode);
