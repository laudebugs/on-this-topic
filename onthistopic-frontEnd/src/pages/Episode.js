import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import * as QueryString from "query-string";
import styled from "styled-components";
import { connect } from "react-redux";
import { loadEpisode, loadEpisodeComments } from "../components/thunks";

import Header from "../components/Header";
import EpisodePlayer from "../components/EpisodePlayer";
import ChatBox from "../components/ChatBox";
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
  const [epComments, setEpComments] = useState([]);
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
      element.innerHTML = `Description:<br/>${this_html}`;
      $("#target").html(element);
    });
    return element;
  }
  let conmmentsDiv = <div></div>;
  if (comments.comments.comments !== undefined) {
    //meaning comments have been loaded
    console.log(comments.comments.comments.podcasts);
    if (comments.comments.comments.isLoading) {
      conmmentsDiv = <div>loading comments...</div>;
      // display comments
    } else {
      console.log("here");
      conmmentsDiv = () => {
        <div>
          {comments.comments.comments.podcasts.map((com) => {
            <div>{com.content}</div>;
          })}
        </div>;
      };
      // function printComments() {
      //   return comments.comments.comments.podcasts.map((comment) => (
      //     <div className="episode">{comment.content}</div>
      //   ));
      // }
      // conmmentsDiv = printComments();
      // console.log(conmmentsDiv);
    }
  }
  const AddTopic = (
    <svg width="20" viewBox="0 0 230 230" fill="#545454">
      <circle
        cx="115"
        cy="115"
        r="105"
        fill="none"
        stroke="#545454"
        strokeWidth="16px"
      ></circle>
      <rect x="105" y="50" width="20" height="140" rx="25" ry="25"></rect>
      <rect x="50" y="105" width="140" height="20" rx="25" ry="25"></rect>
    </svg>
  );
  if (episode.episode !== undefined) {
    // If episode is Loading
    if (episode.isLoading) {
      return <div>loading</div>;
    }

    return (
      <div>
        <Header />
        <div style={{ margin: " 0 2.5% 0 2.5%" }}>
          <div style={{ padding: "0 5% 0 5%" }}>
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
                src={
                  "https://about.canva.com/wp-content/uploads/sites/3/2015/01/album-cover.png"
                }
                alt={episode.episode.episode.title}
              />
            </div>
            <div
              style={{
                width: "30%",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              <h2 style={{}}>{episode.episode.episode.title}</h2>
              <p>
                {episode.episode.episode.datePublished.substring(0, 16)} |{" "}
                {HelperFuncs.toHrsMins(episode.episode.episode.duration)}
              </p>
            </div>
            <div
              style={{
                width: "50%",
                display: "inline-block",
              }}
            >
              {AddTopic}
            </div>
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
            <div className="description">
              <div id="target">
                {parsethisHtml(episode.episode.episode.description)}
              </div>
            </div>
          </div>

          {/* The chatbox and related podcasts */}
          <div
            style={{ paddingTop: "1%", width: "50%", display: "inline-block" }}
          >
            <h2 style={{ textAlign: "center" }}>Comments</h2>
            {conmmentsDiv}
            <ChatBox />
          </div>
          <div
            style={{
              width: "50%",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Related</h2>
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
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingEpisode: (slug) => dispatch(loadEpisode(slug)),
  startLoadingComments: (slug) => dispatch(loadEpisodeComments(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Episode);
