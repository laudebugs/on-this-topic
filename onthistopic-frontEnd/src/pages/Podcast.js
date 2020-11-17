import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";

// Podcast takes a prop value which is the id of the podcast
export default function Podcast() {
  let { slug } = useParams();
  let [podcast, setPodcast] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/podcast/${slug}`);
      const body = await result.json();
      setPodcast(body);
    };
    fetchData();
  }, [slug]);
  return (
    <div>
      <Header />
      <h2>{slug}</h2>
    </div>
  );
}
