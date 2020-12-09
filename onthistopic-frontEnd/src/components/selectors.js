export const getPodcast = (state) => state.podcast.podcast;
export const getPlayer = (state) => state.player.player;
export const getPodcasts = (state) => state.podcasts.podcasts;
export const getEpisode = (state) => state.episode.episode;

export const getPausePlay = (state) => state.player.pause;
export const getVolume = (state) => state.player.volume;
export const getLoggedInStatus = (state) => state.user.loggedIn;
export const getLoggInLoading = (state) => state.user.statusUpdated;
export const getUser = (state) => state.user;
//Getting comments
export const getComments = (state) => state.comments;
export const getTopics = (state) => state.topics;
