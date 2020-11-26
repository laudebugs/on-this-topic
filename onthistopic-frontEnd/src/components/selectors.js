import { createSelector } from "reselect";

export const getPodcast = (state) => state.podcast.podcast;
export const getIsLoadingPod = (state) => state.podcast.isLoadingPod;
export const getPlayer = (state) => state.player.player;
export const getIsLoading = (state) => state.isLoading;
export const getPodcasts = (state) => state.podcasts;

// export const getPodById = (state, id) =>
//   state.podcasts.podcasts.filter((podcast) => podcast._id === id);

// // export const getPodcast = createSelector(
// //     getPodcasts,
// //     (podcasts) = podcasts.filter(podcast =>podcast._id===id)
// // )
