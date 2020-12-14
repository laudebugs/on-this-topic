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
  LOAD_EPISODE_COMMENTS_IN_PROGRESS,
  LOAD_EPISODE_COMMENTS_SUCCESS,
  LOAD_EPISODE_COMMENTS_FAILURE,
  LOAD_EPISODE_TOPICS_IN_PROGRESS,
  LOAD_EPISODE_TOPICS_SUCCESS,
  LOAD_EPISODE_TOPICS_FAILURE,
  PLAY_IN_PROGRESS,
  PLAY_SUCCESS,
  PLAY_FAILURE,
  SET_VOLUME,
  STATUS_FAILURE,
  STATUS_IN_PROGRESS,
  STATUS_SUCCESS,
} from "./actions";
const initialState = {
  podcasts: {
    isLoading: false,
  },
  podcast: {
    isLoading: false,
    podcast: {},
    episodes: [],
  },
  episode: {
    isLoading: false,
  },
  player: {
    playing: {},
    playingSth: false,
    pause: true,
    switching: false,
    volume: 1,
  },
  topics: {
    isLoading: false,
    themes: [],
    people: [],
    locations: [],
  },
  comments: {
    isLoading: false,
    comments: [],
  },
  user: { loggedIn: false, statusUpdated: true },
};

// A single podcast with episodes
export const podcast = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PODCAST_EPISODES_SUCCESS:
      const pod = payload.podcast;
      const podepisodes = payload.episodes;
      return {
        ...state,
        podcast: {
          isLoading: false,
          podcast: pod,
          episodes: podepisodes,
        },
      };
    case LOAD_PODCAST_EPISODES_IN_PROGRESS:
      return {
        ...state,
        podcast: { isLoading: true },
      };
    case LOAD_PODCAST_EPISODES_FAILURE:
      return {
        ...state,
        podcast: { isLoading: false },
      };
    default:
      return { ...state };
  }
};

export const podcasts = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PODCASTS_SUCCESS:
      const pods = payload.podcasts;
      return {
        ...state,
        podcasts: {
          isLoading: false,
          podcasts: pods,
        },
      };
    case LOAD_PODCASTS_IN_PROGRESS:
      return {
        ...state,
        podcasts: {
          isLoading: true,
        },
      };
    case LOAD_PODCASTS_FAILURE:
      return {
        ...state,
        podcasts: {
          isLoading: false,
        },
      };
    default:
      return { ...state };
  }
};
export const episode = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EPISODE_SUCCESS:
      const ep = payload;
      return {
        ...state,
        episode: {
          isLoading: false,
          episode: ep,
        },
      };
    case LOAD_EPISODE_IN_PROGRESS:
      return {
        ...state,
        episode: {
          isLoading: true,
        },
      };
    case LOAD_EPISODE_FAILURE:
      return {
        ...state,
        episode: {
          isLoading: false,
        },
      };
    default:
      return { ...state };
  }
};

export const comments = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EPISODE_COMMENTS_SUCCESS:
      const theseComments = payload.comments;
      return {
        ...state,
        comments: {
          isLoading: false,
          comments: theseComments,
        },
      };
    case LOAD_EPISODE_COMMENTS_IN_PROGRESS:
      return {
        ...state,
        comments: {
          isLoading: true,
        },
      };
    case LOAD_EPISODE_COMMENTS_FAILURE:
      return {
        ...state,
        comments: {
          isLoading: false,
        },
      };
    default:
      return { ...state };
  }
};
/**
 * Topics for a particular episode
 */
export const topics = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EPISODE_TOPICS_SUCCESS:
      const theseTopics = payload;
      return {
        ...state,
        topics: {
          isLoading: false,
          themes: theseTopics.topics.themes,
          people: theseTopics.topics.people,
          locations: theseTopics.topics.locations,
        },
      };
    case LOAD_EPISODE_TOPICS_IN_PROGRESS:
      return {
        ...state,
        topics: {
          isLoading: true,
        },
      };
    case LOAD_EPISODE_TOPICS_FAILURE:
      return {
        ...state,
        topics: {
          isLoading: false,
        },
      };
    default:
      return { ...state };
  }
};
/**
 

 player: {
    playing: {},
    playingSth: false,
    pause: true,
    switching: false,
    volume: 1,
  },
 */
export const player = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_VOLUME:
      const volume = payload;
      return {
        ...state,
        player: {
          playing: state.player.playing,
          volume: volume.volume,
          playingSth: state.player.playingSth,
          pause: state.player.pause,
          switching: state.player.switching,
        },
      };
    case PLAY_EPISODE:
      const ep = payload;
      return {
        ...state,
        player: {
          ...state.player,
          volume: state.player.volume,
          playing: ep,
          playingSth: true,
        },
      };
    case PLAY_SUCCESS:
      const { pause } = payload;
      return {
        ...state,
        player: {
          ...state.player,
          volume: state.player.volume,
          switching: false,
          pause: pause,
        },
      };
    case PLAY_IN_PROGRESS:
      return {
        ...state,
        player: {
          ...state.player,
          volume: state.player.volume,
          switching: true,
        },
      };
    case PLAY_FAILURE:
      return {
        ...state,
        player: {
          ...state.player,
          volume: state.player.volume,
          switching: false,
        },
      };
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
        user: { loggedIn: state.user.loggedIn, statusUpdated: false },
      };
    case STATUS_FAILURE:
      return {
        ...state,
        user: { loggedIn: state.user.loggedIn, statusUpdated: true },
      };
    case STATUS_SUCCESS:
      const status = payload;
      return {
        ...state,
        user: { loggedIn: status.status, statusUpdated: true },
      };
    default:
      return {
        ...state,
      };
  }
};
