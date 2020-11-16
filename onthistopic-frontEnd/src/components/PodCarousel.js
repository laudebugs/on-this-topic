import React from "react";

import PodElement from "./PodElement";

export default function PodCarousel() {
  let podcasts;
  fetch("http://localhost:4000/allPodcasts")
    .then((response) => response.json())
    .then((data) => {
      podcasts = data;
      console.log(podcasts);
    });
  podcasts = ["here", "there"];
  const printCarosel = () => {
    return podcasts.map((pod) => (
      <div>
        <div>Pod goes here</div>
      </div>
    ));
  };
  return (
    <div>
      <h1>Podcasts:</h1>
      {printCarosel()}
    </div>
  );
}
