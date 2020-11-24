/**
 * Takes the current state and decides what to change
 */
import {
  PLAY_EPISODE,
  STOP_PLAY,
  PAUSE_PLAY,
  LOAD_PODCASTS_IN_PROGRESS,
  LOAD_PODCASTS_SUCCESS,
  LOAD_PODCASTS_FAILURE,
  LOAD_PODCAST_EPISODES_IN_PROGRESS,
  LOAD_PODCAST_EPISODES_SUCCESS,
  LOAD_PODCAST_EPISODES_FAILURE,
} from "./actions";

export const isLoading = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_PODCASTS_IN_PROGRESS:
      return true;
    case LOAD_PODCASTS_SUCCESS:
    case LOAD_PODCASTS_FAILURE:
      return false;
    default:
      return state;
  }
};

export const isLoadingPod = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_PODCAST_EPISODES_IN_PROGRESS:
      return true;
    case LOAD_PODCAST_EPISODES_SUCCESS:
    case LOAD_PODCAST_EPISODES_FAILURE:
      return false;
    default:
      return state;
  }
};
// A single podcast with episodes
export const podcast = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PODCAST_EPISODES_SUCCESS:
      const { podcast } = payload;
      return podcast;
    case LOAD_PODCAST_EPISODES_IN_PROGRESS:
    case LOAD_PODCAST_EPISODES_FAILURE:
    default:
      return state;
  }
};
export const podcasts = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PODCASTS_SUCCESS:
      const { podcasts } = payload;
      return podcasts;
    case LOAD_PODCASTS_IN_PROGRESS:
    case LOAD_PODCASTS_FAILURE:
    default:
      return state;
  }
};
export const player = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAY_EPISODE:
      const { episode } = payload;
      return {
        playing: [episode],
        playingSth: true,
        pause: false,
      };

    case STOP_PLAY:
      return "";

    case PAUSE_PLAY:
      var temp = { ...state };
      temp.pause = true;
      return temp;

    // case LOAD_PODCASTS_IN_PROGRESS:
    //   temp = { ...state };
    //   //   temp.podcasts = true;
    //   return temp;

    default:
      return {
        playing: [],
        playingSth: false,
        pause: true,
      };
  }
};
