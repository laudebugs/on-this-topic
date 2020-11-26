import {
  loadPodcastsInProgress,
  loadPodcastsSuccess,
  loadPodcastsFailure,
  loadPodcastEpisodesInProgress,
  loadPodcastEpisodesSuccess,
  loadPodcastEpisodesFailure,
  playInProgress,
  playSuccess,
  playFailure,
} from "./actions";

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

    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let parser = new Parser();

    let feed = await parser.parseURL(CORS_PROXY + podcast.rssFeed);
    podcast.episodes = feed.items.slice(0, 100);

    dispatch(loadPodcastEpisodesSuccess(podcast));
  } catch (error) {
    console.log(error);
    dispatch(loadPodcastEpisodesFailure());
  }
};
