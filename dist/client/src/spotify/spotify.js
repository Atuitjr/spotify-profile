"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrackInfo = exports.getUserInfo = exports.getTrackAudioFeatures = exports.getTrackAudioAnalysis = exports.getTrack = exports.getRecommendationsForTracks = exports.getAudioFeaturesForTracks = exports.getPlaylistTracks = exports.getPlaylist = exports.followPlaylist = exports.addTracksToPlaylist = exports.createPlaylist = exports.doesUserFollowPlaylist = exports.doesUserFollowArtist = exports.followArtist = exports.getArtist = exports.getTopTracksLong = exports.getTopTracksMedium = exports.getTopTracksShort = exports.getTopArtistsLong = exports.getTopArtistsMedium = exports.getTopArtistsShort = exports.getPlaylists = exports.getRecentlyPlayed = exports.getFollowing = exports.getUser = exports.logout = exports.token = exports.getAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
const setTokenTimestamp = () => window.localStorage.setItem("spotify_token_timestamp", Date.now().toString());
const setLocalAccessToken = (token) => {
    setTokenTimestamp();
    window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token) => window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () => window.localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () => window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () => window.localStorage.getItem("spotify_refresh_token");
// Refresh the token
const refreshAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        window.location.reload();
        return;
    }
    catch (e) {
        console.error(e);
    }
});
// Get access token off of query params (called on application init)
exports.getAccessToken = () => {
    const { error, access_token, refresh_token } = utils_1.getHashParams();
    if (error) {
        console.error(error);
        refreshAccessToken();
    }
    // If token has expired
    if (Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
        console.warn("Access token has expired, refreshing...");
        refreshAccessToken();
    }
    const localAccessToken = getLocalAccessToken();
    const localRefreshToken = getLocalRefreshToken();
    // If there is no REFRESH token in local storage, set it as `refresh_token` from params
    if (!localRefreshToken || localRefreshToken === "undefined") {
        setLocalRefreshToken(refresh_token);
    }
    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if (!localAccessToken || localAccessToken === "undefined") {
        setLocalAccessToken(access_token);
        return access_token;
    }
    return localAccessToken;
};
exports.token = exports.getAccessToken();
exports.logout = () => {
    window.localStorage.removeItem("spotify_token_timestamp");
    window.localStorage.removeItem("spotify_access_token");
    window.localStorage.removeItem("spotify_refresh_token");
    window.location.reload();
};
// API CALLS ***************************************************************************************
const headers = {
    Authorization: `Bearer ${exports.token}`,
    "Content-Type": "application/json",
};
/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
exports.getUser = () => axios_1.default.get("https://api.spotify.com/v1/me", { headers });
/**
 * Get User's Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
exports.getFollowing = () => axios_1.default.get("https://api.spotify.com/v1/me/following?type=artist", {
    headers,
});
/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
exports.getRecentlyPlayed = () => axios_1.default.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers,
});
/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
exports.getPlaylists = () => axios_1.default.get("https://api.spotify.com/v1/me/playlists", { headers });
/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
exports.getTopArtistsShort = () => axios_1.default.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term", {
    headers,
});
exports.getTopArtistsMedium = () => axios_1.default.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term", {
    headers,
});
exports.getTopArtistsLong = () => axios_1.default.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term", { headers });
/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
exports.getTopTracksShort = () => axios_1.default.get("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term", { headers });
exports.getTopTracksMedium = () => axios_1.default.get("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term", {
    headers,
});
exports.getTopTracksLong = () => axios_1.default.get("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", { headers });
/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
 */
exports.getArtist = (artistId) => axios_1.default.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });
/**
 * Follow an Artist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
exports.followArtist = (artistId) => {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
    return axios_1.default({ method: "put", url, headers });
};
/**
 * Check if Current User Follows Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
exports.doesUserFollowArtist = (artistId) => axios_1.default.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
    headers,
});
/**
 * Check if Users Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
exports.doesUserFollowPlaylist = (playlistId, userId) => axios_1.default.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`, {
    headers,
});
/**
 * Create a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
 */
exports.createPlaylist = (userId, name) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = JSON.stringify({ name });
    return axios_1.default({ method: "post", url, headers, data });
};
/**
 * Add Tracks to a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */
exports.addTracksToPlaylist = (playlistId, uris) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
    return axios_1.default({ method: "post", url, headers });
};
/**
 * Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/
 */
exports.followPlaylist = (playlistId) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
    return axios_1.default({ method: "put", url, headers });
};
/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
exports.getPlaylist = (playlistId) => axios_1.default.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers,
});
/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
 */
exports.getPlaylistTracks = (playlistId) => axios_1.default.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers,
});
/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = (tracks) => tracks.map(({ track }) => track.id).join(",");
/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */
exports.getAudioFeaturesForTracks = (tracks) => {
    const ids = getTrackIds(tracks);
    return axios_1.default.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        headers,
    });
};
/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
exports.getRecommendationsForTracks = (tracks) => {
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
    const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
    const seed_artists = "";
    const seed_genres = "";
    return axios_1.default.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`, {
        headers,
    });
};
/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
exports.getTrack = (trackId) => axios_1.default.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });
/**
 * Get Audio Analysis for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
exports.getTrackAudioAnalysis = (trackId) => axios_1.default.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
    headers,
});
/**
 * Get Audio Features for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 */
exports.getTrackAudioFeatures = (trackId) => axios_1.default.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers,
});
exports.getUserInfo = () => {
    return axios_1.default
        .all([
        exports.getUser(),
        exports.getFollowing(),
        exports.getPlaylists(),
        exports.getTopArtistsLong(),
        exports.getTopTracksLong(),
    ])
        .then(axios_1.default.spread((user, followedArtists, playlists, topArtists, topTracks) => {
        return {
            user: user.data,
            followedArtists: followedArtists.data,
            playlists: playlists.data,
            topArtists: topArtists.data,
            topTracks: topTracks.data,
        };
    }));
};
exports.getTrackInfo = (trackId) => {
    return axios_1.default
        .all([
        exports.getTrack(trackId),
        exports.getTrackAudioAnalysis(trackId),
        exports.getTrackAudioFeatures(trackId),
    ])
        .then(axios_1.default.spread((track, audioAnalysis, audioFeatures) => {
        return {
            track: track.data,
            audioAnalysis: audioAnalysis.data,
            audioFeatures: audioFeatures.data,
        };
    }));
};
//# sourceMappingURL=spotify.js.map