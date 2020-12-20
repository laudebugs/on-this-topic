import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPlayer, getEpisode } from "./selectors";
import User from "../components/icons/User";

import $ from "jquery";
const mapStateToProps = (state) => ({
  player: getPlayer(state),
  episode: getEpisode(state),
});
const mapDispatchToProps = (dispatch) => ({});

const ChatBox = ({ episode }) => {
  return (
    <div
      style={{
        padding: "1%",
        verticalAlign: "top",
      }}
    >
      <User
        style={{
          width: "30px",
          padding: "0.5%",
          diplay: "inline-block",
          verticalAlign: "top",
        }}
      />
      <form style={{ width: "90%", display: "inline-block" }}>
        <textarea
          style={{
            width: "100%",
            borderRadius: "5px",
            background: "#D9D9D9",
            fontFamily: "Glacial Indifference",
            fontSize: "125%",
            height: "15vh",
          }}
          id="comment"
          typeof="text"
          name="comment"
          placeholder="Add comment.
Use #word# for a topic, *word* for a person and ^word^ for location. Use @ to mention someone"
        ></textarea>

        <div
          id="commentBtn"
          typeof="button"
          style={{ width: "30px", float: "right", padding: "0.5%" }}
          onClick={async () => {
            console.log(episode.episode.episode._id);
            const comment = $("#comment")[0].value;
            const options = {
              method: "POST",
              body: JSON.stringify({
                episodeId: episode.episode.episode._id,
                comment: comment,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            };
            /*
             * Do some checks like minumum word count - if the user is logged in or not
             * No spam :)
             */
            if (comment !== "") {
              await fetch("/api/episode/addcomment", options);
            }
            $("#comment")[0].value = "";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375">
            <defs>
              <clipPath id="clip1">
                <path d="M 28.140625 28.140625 L 346.890625 28.140625 L 346.890625 346.890625 L 28.140625 346.890625 Z M 28.140625 28.140625 " />
              </clipPath>
            </defs>
            <g id="surface1">
              <g clip-path="url(#clip1)" clip-rule="nonzero">
                <path
                  style={{
                    stroke: "none",
                    fillRule: "nonzero",
                    fill: "rgb(0%,0%,0%)",
                    fillOpacity: "1",
                  }}
                  d="M 346.925781 28.140625 L 28.140625 144.039062 L 114.808594 230.742188 L 283.167969 91.894531 L 144.320312 260.253906 L 231.023438 346.925781 Z M 346.925781 28.140625 "
                />
              </g>
            </g>
          </svg>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
