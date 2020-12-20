import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import * as QueryString from "query-string";
import { connect } from "react-redux";
import { loadEpisode, loadEpisodeComments } from "../components/thunks";

import Header from "../components/Header";
import EpisodePlayer from "../components/EpisodePlayer";
import ChatBox from "../components/ChatBox";
import EpisodeTopics from "../components/EpisodeTopics";
import Comments from "../components/Comments";
import Spinner from "../components/Spinner";

import HelperFuncs from "../components/HelperFuncs";
import { getEpisode, getComments } from "../components/selectors";
const Episode = ({
  comments,
  episode,
  startLoadingEpisode,
  startLoadingComments,
}) => {
  const params = QueryString.parse(window.location.search);
  let { slug } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    startLoadingEpisode(
      `${slug}?episode=${encodeURIComponent(params.episode)}`
    );
    setLoaded(true);
  }, [loaded]);

  // initialize comments
  const [loadedComments, setLoadedComments] = useState(false);
  useEffect(() => {
    startLoadingComments(
      `${slug}?episode=${encodeURIComponent(params.episode)}`
    );
    setLoadedComments(true);
  }, [loadEpisodeComments]);

  // if (episode.episode !== undefined) console.log(episode.episode.episode);
  function parsethisHtml(this_html) {
    var element;
    $("document").ready(function () {
      element = document.createElement("div");
      element.innerHTML = `${this_html}`;
      $("#target").html(element);
    });
    return element;
  }
  let conmmentsDiv = <div></div>;
  if (comments.comments.comments !== undefined) {
    //meaning comments have been loaded
    // console.log(comments.comments.comments);
    if (comments.comments.comments.isLoading) {
      conmmentsDiv = <div>loading comments...</div>;
      // display comments
    } else {
      // console.log("write posts");
      function printComments() {
        return <div></div>;
        // return comments.comments.comments.map((comment) => (
        //   <div className="episode">{comment.content}</div>
        // ));
      }
      conmmentsDiv = printComments();
    }
  }
  function printOutput() {
    if (episode.episode !== undefined) {
      // If episode is Loading
      if (episode.isLoading) {
        return <Spinner />;
      }

      return (
        <div className="episodePage">
          <div className="episodeHeader" style={{}}>
            <EpisodePlayer episode={episode.episode.episode} />
            <div className="episodeArtwork">
              <img
                src={episode.episode.episode.image}
                alt={episode.episode.episode.title}
              />
            </div>
            <div className="episodeTitle">
              <h2>{episode.episode.episode.title}</h2>
              <p>
                {episode.episode.episode.datePublished.substring(0, 16)} |{" "}
                {HelperFuncs.toHrsMins(episode.episode.episode.duratix)}
              </p>
            </div>
            <EpisodeTopics />
          </div>
          <hr style={{ textAlign: "center", width: "90%" }}></hr>
          <div className="episodeDescription">
            <div id="target">
              {parsethisHtml(episode.episode.episode.description)}
            </div>
          </div>
          <hr style={{ textAlign: "center", width: "90%" }}></hr>

          {/* The chatbox and related podcasts */}
          <div className="chatBox">
            <h2 style={{ textAlign: "center" }}>Comments</h2>
            <Comments episode={episode} />
            <ChatBox />
          </div>
          <div className="relatedPods">
            <h2 style={{ textAlign: "center" }}>Related</h2>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
  return (
    <div style={{ marginBottom: "90px" }}>
      <Header />
      {printOutput()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  episode: getEpisode(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingEpisode: (slug) => dispatch(loadEpisode(slug)),
  startLoadingComments: (slug) => dispatch(loadEpisodeComments(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Episode);
