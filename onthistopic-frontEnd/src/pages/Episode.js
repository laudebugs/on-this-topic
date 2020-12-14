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
        <div
          style={{
            margin: " 0 2.5% 0 2.5%",
          }}
        >
          <div
            style={{
              height: "100px",
              padding: "0 5% 0 5%",
            }}
          >
            <EpisodePlayer
              episode={episode.episode.episode}
              style={{
                width: "5%",
                display: "inline-block",
                textAlign: "center",
              }}
            />
            <div
              style={{
                width: "10%",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <img
                style={{
                  width: "100px",
                  verticalAlign: "middle",
                }}
                src={episode.episode.episode.image}
                alt={episode.episode.episode.title}
              />
            </div>
            <div
              style={{
                width: "30%",
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              <h2 style={{}}>{episode.episode.episode.title}</h2>
              <p>
                {episode.episode.episode.datePublished.substring(0, 16)} |{" "}
                {HelperFuncs.toHrsMins(episode.episode.episode.duratix)}
              </p>
            </div>
            <EpisodeTopics
              style={{
                width: "40%",
                display: "inline-block",
                verticalAlign: "top",
                padding: "0.5%",
              }}
            />
            <div></div>
          </div>
          <hr style={{ textAlign: "center", width: "90%" }}></hr>
          <div
            style={{
              display: "inline-block",
              width: "90%",
              alignSelf: "center",
              margin: " 0 2.5% 0 2.5%",
            }}
          >
            <div
              className="description"
              style={{
                paddingTop: "0",
                width: "100%",
              }}
            >
              <div id="target">
                {parsethisHtml(episode.episode.episode.description)}
              </div>
            </div>
          </div>
          <hr style={{ textAlign: "center", width: "90%" }}></hr>

          {/* The chatbox and related podcasts */}
          <div
            style={{
              padding: "1% 2.5% 0 2.5%",
              width: "45%",
              display: "inline-block",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Comments</h2>
            <Comments episode={episode} />
            <ChatBox />
          </div>
          <div
            style={{
              width: "45%",
              display: "inline-block",
              verticalAlign: "top",
              padding: "1% 2.5% 0 2.5%",
            }}
          >
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
