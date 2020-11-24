import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import PodElement from "./PodElement";
import { loadPodcasts } from "./thunks";

const PodCarousel = ({ podcasts = [], isLoading, startLoadingPodcasts }) => {
  useEffect(() => {
    startLoadingPodcasts();
  }, [startLoadingPodcasts]);
  const loadingMessage = <div>Loading Podcasts...</div>;
  // const printCarosel = () => {
  //   return <div className="carouselImage"></div>;
  // };
  const content = podcasts.map((pod) => (
    <div className="carouselImage">
      <Link to={`/podcast/${pod._id}`}>
        <img src={pod.image} alt={pod.title} />
      </Link>
    </div>
  ));
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  podcasts: state.podcasts,
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingPodcasts: () => dispatch(loadPodcasts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PodCarousel);
