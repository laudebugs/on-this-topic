import React, { useEffect, useState } from "react";

import { Link, Redirect, Route } from "react-router-dom";

import Header from "../components/Header";
import StillWorking from "../css/still-working.gif";
import $ from "jquery";
import PodEpisodes from "../components/PodEpisodes";
import Podcast from "../pages/Podcast";
const SubmitPod = () => {
  const [sumbitted, setSubmitted] = useState(false);
  const [slug, setSlug] = useState("");

  async function submitPodcast(e) {
    e.preventDefault();

    let feedUrl = $("#rss_feed")[0].value;
    const options = {
      method: "POST",
      body: JSON.stringify({
        rss_feed: feedUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (feedUrl !== "") {
      let response = await fetch("/api/podcast", options);
      response = await response.json();
      console.log(response);
      setSubmitted(response.saved);
      console.log(response.podUrl);
      setSlug(response.podUrl);
      // window.location.replace(`/podcast/${response.podUrl}`);
    }
  }
  if (sumbitted === true && slug !== "") {
    console.log("slug is: " + slug);
    /**
     * Figure out how to redirect to another page with history
     */
    return <Redirect to={`/podcast/${slug}`} />;
  }
  let errorMessage = <div></div>;
  return (
    <>
      <Header />
      <div className="submitPodForm">
        <form>
          {errorMessage}
          <h2>Rss Feed Url:</h2>
          <div>
            <textarea
              type="text"
              name="rss_feed"
              id="rss_feed"
              required
            ></textarea>
          </div>
          <button onClick={submitPodcast} class="signinbtn" type="submit">
            Submit Podcast
          </button>
        </form>
      </div>
    </>
  );
};
export default SubmitPod;
