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
  type: PLAY_IN_PROGRESS,
  payload: { pause },
});
export const PLAY_FAILURE = "PLAY_FAILURE";
export const playFailure = () => ({
  type: PLAY_FAILURE,
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
