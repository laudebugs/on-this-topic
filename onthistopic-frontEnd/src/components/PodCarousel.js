import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import PodElement from "./PodElement";
import { loadPodcasts } from "./thunks";
import { getPodcasts } from "./selectors";
import Spinner from "../components/Spinner";
const PodCarousel = ({ podcasts, startLoadingPodcasts }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (podcasts.podcasts === undefined) startLoadingPodcasts();
    setLoaded(true);
  }, [loaded]);

  if (podcasts.isLoading === false && podcasts.podcasts !== undefined) {
    return podcasts.podcasts.map((pod) => (
      <div className="carouselImage">
        <Link to={`/podcast/${pod.slug}`}>
          <img src={pod.image} alt={pod.title} />
        </Link>
      </div>
    ));
  } else {
    const loadingMessage = <Spinner />;

    return loadingMessage;
  }
};

const mapStateToProps = (state) => ({
  podcasts: getPodcasts(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingPodcasts: () => dispatch(loadPodcasts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PodCarousel);
