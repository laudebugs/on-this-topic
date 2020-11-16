import React, { useState, useEffect } from "react";
import PodElement from "./PodElement";

export default function PodCarousel() {
  let [podcasts, setPodcasts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/allpodcasts");
      const body = await result.json();
      setPodcasts(body);
      console.log(body[0]);
    };
    fetchData();
  }, []);
  console.log(podcasts[0]);
  console.log(podcasts.length);
  const pods = [];
  for (var i in podcasts) {
    pods.push(podcasts[i]);
  }
  const printCarosel = () => {
    return pods.map((pod) => (
      <div className="carouselImage">
        <img src={pod.image} alt={pod.title} />
      </div>
    ));
  };
  return (
    <div className="carousel">
      <div className="horizontal-scroll-wrapper">{printCarosel()}</div>
    </div>
  );
}
