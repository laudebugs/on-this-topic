import { createSelector } from "reselect";

export const getPodcast = (state) => state.podcast.podcast;
export const getIsLoadingPod = (state) => state.podcast.isLoadingPod;
export const getPlayer = (state) => state.player.player;
export const getIsLoading = (state) => state.isLoading;
export const getPodcasts = (state) => state.podcasts;
export const getPausePlay = (state) => state.player.pause;
