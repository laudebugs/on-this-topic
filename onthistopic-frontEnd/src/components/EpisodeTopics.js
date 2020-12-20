import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadEpisodeTopics } from "../components/thunks";

import { getEpisode, getTopics } from "../components/selectors";
import $ from "jquery";
// Podcast takes a prop value which is the id of the podcast
const EpisodeTopics = ({ episode, topics, startLoadingTopics }) => {
  const slug = episode.episode.episode.slug;
  useEffect(() => {
    console.log("loading topics");
    startLoadingTopics(slug);
  }, []);
  $("#topicBtn").on("click", () => {
    startLoadingTopics(slug);
  });

  function printThemes() {
    if (topics.topics.isLoading) return <div></div>;
    else
      return topics.topics.themes.map((topic) => (
        <span class="theme topic">{topic.title}</span>
      ));
  }
  function printPeople() {
    if (topics.topics.isLoading) return <div></div>;
    else
      return topics.topics.people.map((topic) => (
        <span style={{ height: "24px", margin: "1%" }} class="person topic">
          {topic.title}
        </span>
      ));
  }
  function printLocations() {
    if (topics.topics.isLoading) return <div></div>;
    else
      return topics.topics.locations.map((topic) => (
        <span
          style={{ lineHeight: "12px", margin: "1%" }}
          class="location topic"
        >
          {topic.title}
        </span>
      ));
  }

  return (
    <div className="episodeTopics">
      {/* {AddTopic} */}
      {printPeople()}
      {printLocations()}
      {printThemes()}
    </div>
  );
};
const mapStateToProps = (state) => ({
  topics: getTopics(state),
  episode: getEpisode(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTopics: (slug) => dispatch(loadEpisodeTopics(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeTopics);

/**
 

  let AddTopic = (
    <div style={{ display: "inline-block" }} className="addTopic">
      <svg id="sendThis" width="20" viewBox="0 0 230 230" fill="#545454">
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
      <span style={{ margin: "0 1% 0 1%", width: "90%" }} className="newDiv">
        <select name="selectTopicType" id="typeOfTopic">
          <option value="Theme">theme</option>
          <option value="Person">person</option>
          <option value="Location">location</option>
        </select>
        <input
          style={{ width: "50%", margin: "1%" }}
          type="text"
          name="newTopic"
          id="newTopic"
        ></input>
        <span
          id="sendTopic"
          onClick={() => {
            $(".newDiv").css({ display: "none" });
          }}
        >
          ↗
        </span>
      </span>
    </div>
  ); 
  $("span#sendTopic").on("click", async () => {
    console.log("trynna send sth");
    const topic = $("#sendTopic")[0].value;
    console.log(topic);
    const topicType = $("#typeOfTopic")[0].value;
    const options = {
      method: "POST",
      body: JSON.stringify({
        topicType: topicType,
        topic: topic,
        episodeId: episode.episode.episode._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    // 
    //  * Do some checks like minumum word count - if the user is logged in or not
    //  * No spam :)
    //  
    if (topic !== "") {
      let result = await fetch("/addtopic", options);
      console.log(await result.json());
    }
    $("#comment")[0].value = "";
    console.log($(".newDiv"));
  });
  function handler(e) {
    $(".newDiv").css({ display: "inline-block" });

    $("span#sendTopic").on("click", async () => {
      console.log("trynna send sth");
      const topic = $("#newTopic")[0].value;
      const topicType = $("#typeOfTopic")[0].value;
      const options = {
        method: "POST",
        body: JSON.stringify({
          topicType: topicType,
          topic: topic,
          episodeId: episode.episode.episode._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // 
      //  * Do some checks like minumum word count - if the user is logged in or not
      //  * No spam :)
      //  
      if (topic !== "") {
        await fetch("/addTopic", options);
      }
    });
    console.log("event");
    // $(this).off(e);
    // $(this).off("click");
    // e.target.removeEventListener(e.type, handler);
  }
  $("#sendThis").on("click", handler);
*/
