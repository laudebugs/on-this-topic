import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";

import { connect } from "react-redux";
import { loadPodcastEpisodes } from "../components/thunks";

import Header from "../components/Header";
import PodEpisodes from "../components/PodEpisodes";
import { getPodcast, getIsLoadingPod } from "../components/selectors";
const Podcast = ({ podcast, isLoadingPod, startLoadingPodcastEpisodes }) => {
  let { slug } = useParams();
  useEffect(() => {
    startLoadingPodcastEpisodes(slug);
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
  const loadingMessage = <div>Loading Podcasts...</div>;
  const PodPage = (
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
        <PodEpisodes podImage={podcast.image} episodes={podcast.episodes} />
      </div>
    </div>
  );
  return isLoadingPod ? loadingMessage : PodPage;
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  podcast: getPodcast(state),
  isLoadingPod: getIsLoadingPod(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingPodcastEpisodes: (slug) => dispatch(loadPodcastEpisodes(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);
