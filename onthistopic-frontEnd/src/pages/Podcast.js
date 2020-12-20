import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import RubberSlider from "@shwilliam/react-rubber-slider";
import "@shwilliam/react-rubber-slider/dist/styles.css";

import { connect } from "react-redux";
import { loadPodcastEpisodes } from "../components/thunks";

import Header from "../components/Header";
import PodEpisodes from "../components/PodEpisodes";
import { getPodcast } from "../components/selectors";
import Spinner from "../components/Spinner";
const Podcast = ({ podcast, startLoadingPodcastEpisodes }) => {
  const [loaded, setLoaded] = useState(false);

  let { slug } = useParams();
  useEffect(() => {
    startLoadingPodcastEpisodes(slug);
    setLoaded(true);
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
  function printOutput() {
    if (podcast.podcast !== undefined) {
      if (podcast.podcast.podcast === undefined) {
        return <Spinner />;
      } else {
        if (podcast.podcast.isLoading) return <Spinner />;
        else
          return (
            <>
              <div className="podInfo">
                <div className="podcastArtwork">
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
                  episodes={podcast.podcast.episodes}
                />
              </div>
            </>
          );
      }
    } else return <Spinner />;
  }
  console.log(podcast);

  return (
    <div>
      <Header />
      {printOutput()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  podcast: getPodcast(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingPodcastEpisodes: (slug) => dispatch(loadPodcastEpisodes(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);
