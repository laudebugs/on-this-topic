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
  PLAY_IN_PROGRESS,
  PLAY_SUCCESS,
  PLAY_FAILURE,
} from "./actions";
const initialState = {
  isLoading: false,
  isLoadingPod: false,
  podcasts: [],
  podcast: [],
  player: { playing: {}, playingSth: false, pause: true },
};

// A single podcast with episodes
export const podcast = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PODCAST_EPISODES_SUCCESS:
      const { podcast } = payload;
      return {
        ...state,
        isLoadingPod: false,
        podcast: podcast,
      };
    case LOAD_PODCAST_EPISODES_IN_PROGRESS:
      return {
        ...state,
        isLoadingPod: true,
      };
    case LOAD_PODCAST_EPISODES_FAILURE:
      return {
        ...state,
        isLoadingPod: false,
      };
    default:
      return { ...state };
  }
};

export const podcasts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PODCASTS_SUCCESS:
      const { podcasts } = payload;
      return {
        ...state,
        isLoading: false,
        podcasts: podcasts,
      };
    case LOAD_PODCASTS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_PODCASTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export const player = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAY_EPISODE:
      const { episode } = payload;
      return {
        ...state,
        player: { playing: episode, playingSth: true, pause: false },
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
        ...state,
        playing: [],
        playingSth: false,
        pause: true,
      };
  }
};
