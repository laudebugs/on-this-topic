import React from "react";

import PodElement from "./PodElement";
export default function PodCarousel() {
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
