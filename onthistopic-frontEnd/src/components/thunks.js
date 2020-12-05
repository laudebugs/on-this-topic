import {
  loadPodcastsInProgress,
  loadPodcastsSuccess,
  loadPodcastsFailure,
  loadPodcastEpisodesInProgress,
  loadPodcastEpisodesSuccess,
  loadPodcastEpisodesFailure,
  loadEpisodeInProgress,
  loadEpisodeSuccess,
  loadEpisodeFailure,
  playInProgress,
  playSuccess,
  playFailure,
  statusInProgress,
  statusSuccess,
  statusFailure,
} from "./actions";
import $ from "jquery";

import Parser from "rss-parser";
export const loadPodcasts = () => async (dispatch, getState) => {
  try {
    dispatch(loadPodcastsInProgress());

    const result = await fetch(`/allpodcasts`);

    const podcasts = await result.json();
    dispatch(loadPodcastsSuccess(podcasts));
  } catch (error) {
    console.log(error);
    dispatch(loadPodcastsFailure());
  }
};

export const loadPodcastEpisodes = (slug) => async (dispatch, getState) => {
  try {
    dispatch(loadPodcastEpisodesInProgress(slug));

    const result = await fetch(`/podcast/${slug}`);
    const podcast = await result.json();

    dispatch(loadPodcastEpisodesSuccess(podcast));
  } catch (error) {
    console.log(error);
    dispatch(loadPodcastEpisodesFailure());
  }
};
export const loadEpisode = (slug) => async (dispatch, getState) => {
  try {
    dispatch(loadEpisodeInProgress(slug));

    const result = await fetch(`/podcast/episode/${slug}`);
    const podcast = await result.json();

    dispatch(loadEpisodeSuccess(podcast));
  } catch (error) {
    console.log(error);
    dispatch(loadEpisodeFailure());
  }
};

export const playPause = () => async (dispatch, getState) => {
  try {
    dispatch(playInProgress());
    var audioelement = $(".audioHere")[0];
    if (audioelement.paused) {
      let p = audioelement.play();
      if (p !== undefined) {
        p.then((_) => {
          dispatch(playSuccess(audioelement.paused));
        });
      }
    } else {
      audioelement.pause();
      dispatch(playSuccess(audioelement.paused));
    }
  } catch (error) {
    console.log(error);
    dispatch(playFailure());
  }
};

export const getStatus = () => async (dispatch, getState) => {
  try {
    dispatch(statusInProgress());
    let result = await fetch("/loginstatus", { credentials: "include" });
    const status = await result.json();
    console.log(status);
    dispatch(statusSuccess(status.status));
  } catch (error) {
    dispatch(statusFailure());
  }
};
