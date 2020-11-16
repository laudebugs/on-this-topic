import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";

// Podcast takes a prop value which is the id of the podcast
export default function Podcast() {
  let { slug } = useParams();
  slug = "5fb074bc4f2626396059f1b4";
  let [podcast, setPodcast] = useState({});
  console.log(slug);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/podcast/${slug}`);
      const body = await result.json();
      setPodcast(body);
      console.log(body[0]);
    };
    fetchData();
  }, [slug]);
  console.log(podcast);
  return (
    <div>
      <Header />
      <h2>{slug}</h2>
    </div>
  );
}
