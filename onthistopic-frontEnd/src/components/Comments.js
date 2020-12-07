import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadEpisode, loadEpisodeComments } from "../components/thunks";

import { getEpisode, getComments } from "../components/selectors";
import $ from "jquery";
// Podcast takes a prop value which is the id of the podcast
const Comments = ({ episode, comments, startLoadingComments }) => {
  const slug = episode.episode.episode.slug;
  useEffect(() => {
    startLoadingComments(slug);
  }, []);
  $("#commentBtn").on("click", () => {
    console.log(comments);
    startLoadingComments(slug);
  });
  let commentTexts = document.getElementsByClassName("commentText");
  // console.log(commentTexts[0]);
  for (let x = 0; x < commentTexts.length; x++) {
    var pplRegex = /(?<=\*)(.*)(?=\*)/g;
    var topicRegex = /(?<=\#)(.*)(?=\#)/g;
    var locationRegex = /(?<=\^).*(?=\^)/g;
    let txt = commentTexts[x].innerHTML;

    if (txt.match(pplRegex) !== null) {
      let ppl = [...txt.match(pplRegex)];
      for (let i = 0; i < ppl.length; i++) {
        let currentWord = ppl[i];
        let replaceWith = `<span class="person topic">${currentWord}</span>`;
        txt = txt.replace(`*${currentWord}*`, replaceWith);
      }
    }

    if (txt.match(locationRegex) !== null) {
      console.log("formatting location");
      let ppl = [...txt.match(locationRegex)];
      for (let i = 0; i < ppl.length; i++) {
        let currentWord = ppl[i];
        let replaceWith = `<span class="location topic">${currentWord}</span>`;
        txt = txt.replace(`^${currentWord}^`, replaceWith);
      }
    }

    if (txt.match(topicRegex) !== null) {
      let ppl = [...txt.match(topicRegex)];
      for (let i = 0; i < ppl.length; i++) {
        let currentWord = ppl[i];
        let replaceWith = `<span class="theme topic">${currentWord}</span>`;
        txt = txt.replace(`#${currentWord}#`, replaceWith);
      }
    }

    commentTexts[x].innerHTML = `${txt}`;
  }
  //   console.log(comments.comments.comments.isLoading);

  function printComments() {
    if (comments.comments.comments !== undefined) {
      if (comments.comments.comments.isLoading) return <div></div>;
      else
        return comments.comments.comments.map((comment) => (
          <div
            style={{
              margin: "0.5%",
              borderBottom: "1px solid grey",
              //   borderRadius: "10px",
              padding: "1%",
            }}
            className="commentText"
          >
            {comment.content}
          </div>
        ));
    } else {
      return <div></div>;
    }
  }

  return (
    <div style={{ fontSize: "125%", margin: "0 5% 0 5%" }}>
      {printComments()}{" "}
    </div>
  );
};
const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingComments: (slug) => dispatch(loadEpisodeComments(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
