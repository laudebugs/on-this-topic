import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PodElement from "./PodElement";

export default function PodCarousel() {
  let [podcasts, setPodcasts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/allpodcasts");
      const body = await result.json();
      setPodcasts(body);
      console.log(podcasts);
    };
    fetchData();
  }, [podcasts]);
  const pods = [];
  for (var i in podcasts) {
    pods.push(podcasts[i]);
  }
  const printCarosel = () => {
    return pods.map((pod) => (
      <div className="carouselImage">
        <Link to={`/podcast/${pod._id}`}>
          <img src={pod.image} alt={pod.title} />
        </Link>
      </div>
    ));
  };
  return (
    <div className="carousel">
      <div className="horizontal-scroll-wrapper">{printCarosel()}</div>
    </div>
  );
}
