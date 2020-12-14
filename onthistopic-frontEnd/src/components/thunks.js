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
  loadEpisodeCommentsInProgress,
  loadEpisodeCommentsSuccess,
  loadEpisodeCommentsFailure,
  loadEpisodeTopicsInProgress,
  loadEpisodeTopicsSuccess,
  loadEpisodeTopicsFailure,
  playInProgress,
  playSuccess,
  playFailure,
  statusInProgress,
  statusSuccess,
  statusFailure,
} from "./actions";
import $ from "jquery";

export const loadPodcasts = () => async (dispatch, getState) => {
  try {
    dispatch(loadPodcastsInProgress());

    const result = await fetch(`/api/allpodcasts`);

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
    console.log(slug);
    const result = await fetch(`/api/podcast/${slug}`);
    const podcast = await result.json();
    console.log(podcast.episodes);
    dispatch(loadPodcastEpisodesSuccess(podcast));
  } catch (error) {
    console.log(error);
    dispatch(loadPodcastEpisodesFailure());
  }
};
export const loadEpisode = (slug) => async (dispatch, getState) => {
  try {
    dispatch(loadEpisodeInProgress(slug));
    const result = await fetch(`/api/podcast/episode/${slug}`);
    const episode = await result.json();
    if (episode !== undefined) {
      dispatch(loadEpisodeSuccess({ ...episode }));
    }
  } catch (error) {
    console.log(error);
    dispatch(loadEpisodeFailure());
  }
};
export const loadEpisodeComments = (slug) => async (dispatch, getState) => {
  try {
    dispatch(loadEpisodeCommentsInProgress(slug));
    const result = await fetch(`/api/podcast/episode/comments/${slug}`);
    const object = await result.json();
    dispatch(loadEpisodeCommentsSuccess(object.comments));
  } catch (error) {
    console.log(error);
    dispatch(loadEpisodeCommentsFailure());
  }
};

export const loadEpisodeTopics = (slug) => async (dispatch, getState) => {
  try {
    dispatch(loadEpisodeTopicsInProgress(slug));
    const result = await fetch(`/api/podcast/episode/topics/${slug}`);
    const object = await result.json();
    dispatch(loadEpisodeTopicsSuccess(object));
  } catch (error) {
    console.log(error);
    dispatch(loadEpisodeTopicsFailure());
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
    let result = await fetch("/api/loginstatus", { credentials: "include" });
    const status = await result.json();
    dispatch(statusSuccess(status.status));
  } catch (error) {
    dispatch(statusFailure());
  }
};
