/**
 * Takes the current state and decides what to change
 */
import {
  PLAY_EPISODE,
  STOP_PLAY,
  LOAD_PODCASTS_IN_PROGRESS,
  LOAD_PODCASTS_SUCCESS,
  LOAD_PODCASTS_FAILURE,
  LOAD_PODCAST_EPISODES_IN_PROGRESS,
  LOAD_PODCAST_EPISODES_SUCCESS,
  LOAD_PODCAST_EPISODES_FAILURE,
  LOAD_EPISODE_IN_PROGRESS,
  LOAD_EPISODE_SUCCESS,
  LOAD_EPISODE_FAILURE,
  PLAY_IN_PROGRESS,
  PLAY_SUCCESS,
  PLAY_FAILURE,
  SET_VOLUME,
  STATUS_FAILURE,
  STATUS_IN_PROGRESS,
  STATUS_SUCCESS,
} from "./actions";
const initialState = {
  isLoading: false,
  isLoadingPod: false,
  isLoadingEpisode: false,
  podcasts: [],
  podcast: [],
  player: {
    playing: {},
    playingSth: false,
    pause: true,
    switching: false,
    volume: 1,
  },
  episode: {},
  user: { loggedIn: false, statusUpdated: true },
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
export const episode = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EPISODE_SUCCESS:
      const { ep } = payload;
      return {
        ...state,
        isLoadingEpisode: false,
        episode: ep,
      };
    case LOAD_EPISODE_IN_PROGRESS:
      return {
        ...state,
        isLoadingEpisode: true,
      };
    case LOAD_EPISODE_FAILURE:
      return {
        ...state,
        isLoadingEpisode: false,
      };
    default:
      return { ...state };
  }
};
export const player = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_VOLUME:
      const { volume } = payload;
      return {
        ...state,
        player: { ...state.player, volume: volume },
      };
    case PLAY_EPISODE:
      const { episode } = payload;
      return {
        ...state,
        player: { ...state.player, playing: episode, playingSth: true },
      };
    case PLAY_SUCCESS:
      const { pause } = payload;
      return {
        ...state,
        player: { ...state.player, switching: false, pause: pause },
      };
    case PLAY_IN_PROGRESS:
      return {
        ...state,
        player: { ...state.player, switching: true },
      };
    case PLAY_FAILURE:
      return {
        ...state,
        player: { ...state.player, switching: false },
      };
    case STOP_PLAY:
      return "";

    default:
      return {
        ...state,
        playing: [],
        playingSth: false,
        pause: true,
      };
  }
};

export const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case STATUS_IN_PROGRESS:
      return {
        ...state,
        user: { ...state.user, statusUpdated: false },
      };
    case STATUS_FAILURE:
      return {
        ...state,
        user: { ...state.user, statusUpdated: true },
      };
    case STATUS_SUCCESS:
      const { status } = payload;
      return {
        ...state,
        user: { ...state.user, loggedIn: status, statusUpdated: true },
      };
    default:
      return {
        ...state,
      };
  }
};
