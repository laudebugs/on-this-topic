import {
  loadPodcastsInProgress,
  loadPodcastsSuccess,
  loadPodcastsFailure,
  loadPodcastEpisodesInProgress,
  loadPodcastEpisodesSuccess,
  loadPodcastEpisodesFailure,
} from "./actions";

export const loadPodcasts = () => async (dispatch, getState) => {
  try {
    dispatch(loadPodcastsInProgress());

    const result = await fetch(`/allpodcasts`);
    const podcasts = await result.json();
    console.log(podcasts);
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
    console.log(podcast);
    dispatch(loadPodcastEpisodesSuccess(podcast));
  } catch (error) {
    console.log(error);
    dispatch(loadPodcastEpisodesFailure());
  }
};
