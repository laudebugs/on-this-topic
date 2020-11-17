import React, { useState, useEffect } from "react";

// Podcast takes a prop value which is the id of the podcast
export default function Podcast({ podcast_id }) {
  //   let { slug } = useParams();
  let [episodes, setEpisodes] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/podcast/episodes/${podcast_id}`);
      const body = await result.json();
      setEpisodes(body);
    };
    fetchData();
  }, [podcast_id]);
  return <div>"episodes go here"</div>;
}
