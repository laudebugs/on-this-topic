import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Podcast takes a prop value which is the id of the podcast
export default function Comments({ comments }) {
  var eps = useState([]);
  console.log(comments);
  function printComments() {
    return comments.map((comment) => (
      <div className="episode">{comment.content}</div>
    ));
  }

  return <div className="episodeList">{printComments()} </div>;
}
