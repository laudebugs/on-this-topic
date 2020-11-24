import {
  loadPodcastsInProgress,
  loadPodcastsSuccess,
  loadPodcastsFailure,
} from "./actions";

export const loadPodcasts = () => async (dispatch, getState) => {
  try {
    dispatch(loadPodcastsInProgress());

    const result = await fetch(`/allpodcasts`);
    const podcasts = await result.json();

    dispatch(loadPodcastsSuccess(podcasts));
  } catch (error) {
    dispatch(loadPodcastsFailure);
  }
};
