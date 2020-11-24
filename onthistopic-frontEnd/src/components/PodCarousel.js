import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PodElement from "./PodElement";

import { loadPodcasts } from "./thunks";

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  podcasts: state.podcasts,
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingPodcasts: () => dispatch(loadPodcasts()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function PodCarousel({ podcasts = [], isLoading, startLoadingPodcasts }) {
  console.log(startLoadingPodcasts);
  useEffect(() => {
    startLoadingPodcasts();
  }, []);
  const loadingMessage = <div>Loading Podcasts...</div>;
  console.log(podcasts);
  const printCarosel = () => {
    return <div className="carouselImage"></div>;
  };
  const content = podcasts.map((pod) => (
    <div className="carouselImage">
      <Link to={`/podcast/${pod._id}`}>
        <img src={pod.image} alt={pod.title} />
      </Link>
    </div>
  ));
  return isLoading ? loadingMessage : content;
});
