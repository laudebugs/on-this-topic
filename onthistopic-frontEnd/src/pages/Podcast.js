import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";

import { connect } from "react-redux";
import { loadPodcastEpisodes } from "../components/thunks";

import Header from "../components/Header";
import PodEpisodes from "../components/PodEpisodes";
import { getPodcast } from "../components/selectors";

const Podcast = ({ podcast, startLoadingPodcastEpisodes }) => {
  const [loaded, setLoaded] = useState(false);

  let { slug } = useParams();
  useEffect(() => {
    startLoadingPodcastEpisodes(slug);
    setLoaded(true);
  }, [loaded]);
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
  if (podcast.podcast !== undefined) {
    if (podcast.podcast.podcast === undefined) {
      return loadingMessage;
    } else {
      return (
        <div>
          <Header />
          <div className="podInfo">
            <div>
              <img
                src={podcast.podcast.podcast.image}
                alt={podcast.podcast.podcast.title}
              />
            </div>

            <div className="description">
              <h2>{podcast.podcast.title}</h2>
              <div id="target">
                {parsethisHtml(podcast.podcast.podcast.description)}
              </div>
            </div>
          </div>
          <div className="podEpisodes">
            <PodEpisodes
              podImage={podcast.image}
              episodes={podcast.podcast.podcast.episodes}
            />
          </div>
        </div>
      );
    }
  } else return loadingMessage;
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  podcast: getPodcast(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingPodcastEpisodes: (slug) => dispatch(loadPodcastEpisodes(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);
