export const PLAY_EPISODE = "PLAY_EPISODE";
export const playEpisode = (episode) => ({
  type: PLAY_EPISODE,
  payload: { episode },
});
export const STOP_PLAY = "STOP_PLAY";
export const stopPlay = (episode) => ({
  type: STOP_PLAY,
  payload: { episode },
});
export const PLAY_IN_PROGRESS = "PLAY_IN_PROGRESS";
export const playInProgress = () => ({
  type: PLAY_IN_PROGRESS,
});
export const PLAY_SUCCESS = "PLAY_SUCCESS";
export const playSuccess = (pause) => ({
  type: PLAY_SUCCESS,
  payload: { pause },
});
export const PLAY_FAILURE = "PLAY_FAILURE";
export const playFailure = () => ({
  type: PLAY_FAILURE,
});
export const SET_VOLUME = "SET_VOLUME";
export const setVolume = (volume) => ({
  type: SET_VOLUME,
  payload: { volume },
});
export const LOAD_PODCASTS_IN_PROGRESS = "LOAD_PODCASTS_IN_PROGRESS";
export const loadPodcastsInProgress = () => ({
  type: LOAD_PODCASTS_IN_PROGRESS,
});

export const LOAD_PODCASTS_SUCCESS = "LOAD_PODCASTS_SUCCESS";
export const loadPodcastsSuccess = (podcasts) => ({
  type: LOAD_PODCASTS_SUCCESS,
  payload: { podcasts },
});

export const LOAD_PODCASTS_FAILURE = "LOAD_PODCASTS_FAILURE";
export const loadPodcastsFailure = () => ({
  type: LOAD_PODCASTS_FAILURE,
});
// actions for a podcast episode
export const LOAD_EPISODE_IN_PROGRESS = "LOAD_EPISODE_IN_PROGRESS";
export const loadEpisodeInProgress = () => ({
  type: LOAD_EPISODE_IN_PROGRESS,
});

export const LOAD_EPISODE_SUCCESS = "LOAD_EPISODE_SUCCESS";
export const loadEpisodeSuccess = (podcasts) => ({
  type: LOAD_EPISODE_SUCCESS,
  payload: { podcasts },
});

export const LOAD_EPISODE_FAILURE = "LOAD_EPISODE_FAILURE";
export const loadEpisodeFailure = () => ({
  type: LOAD_EPISODE_FAILURE,
});
export const LOAD_PODCAST_EPISODES_IN_PROGRESS =
  "LOAD_PODCAST_EPISODES_IN_PROGRESS";
export const loadPodcastEpisodesInProgress = () => ({
  type: LOAD_PODCAST_EPISODES_IN_PROGRESS,
});

export const LOAD_PODCAST_EPISODES_SUCCESS = "LOAD_PODCAST_EPISODES_SUCCESS";
export const loadPodcastEpisodesSuccess = (podcast) => ({
  type: LOAD_PODCAST_EPISODES_SUCCESS,
  payload: { podcast },
});

export const LOAD_PODCAST_EPISODES_FAILURE = "LOAD_PODCAST_EPISODES_FAILURE";
export const loadPodcastEpisodesFailure = () => ({
  type: LOAD_PODCAST_EPISODES_FAILURE,
});

export const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
export const statusInProgress = () => ({
  type: STATUS_IN_PROGRESS,
});

export const STATUS_SUCCESS = "STATUS_SUCCESS";
export const statusSuccess = (status) => ({
  type: STATUS_SUCCESS,
  payload: { status },
});

export const STATUS_FAILURE = "STATUS_FAILURE";
export const statusFailure = () => ({
  type: STATUS_FAILURE,
});
