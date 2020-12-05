import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import * as QueryString from "query-string";

import { connect } from "react-redux";
import { loadEpisode } from "../components/thunks";

import Header from "../components/Header";
import PodEpisodes from "../components/PodEpisodes";
import { getEpisode, getIsLoadingEpisode } from "../components/selectors";

const Episode = ({ episode, isLoadingEpisode, startLoadingEpisode }) => {
  const params = QueryString.parse(window.location.search);
  console.log(params.episode);
  let { slug } = useParams();
  useEffect(() => {
    startLoadingEpisode(
      `${slug}?episode=${encodeURIComponent(params.episode)}`
    );
  }, []);
  function parsethisHtml(this_html) {
    var element;
    $("document").ready(function () {
      element = document.createElement("div");
      element.innerHTML = `${this_html}`;
      $("#target").html(element);
    });
    return element;
  }
  const loadingMessage = <div>Loading Episode...</div>;
  const PodPage = (
    <div>
      <Header />
      {/* <div className="podInfo">
        <div>
          <img src={episode.image} alt={episode.title} />
        </div>

        <div className="description">
          <h2>{episode.title}</h2>
          <div id="target">{parsethisHtml(episode.description)}</div>
        </div>
      </div> */}
    </div>
  );
  return isLoadingEpisode ? loadingMessage : PodPage;
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  podcast: getEpisode(state),
  isLoadingPod: getIsLoadingEpisode(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingEpisode: (slug) => dispatch(loadEpisode(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Episode);
