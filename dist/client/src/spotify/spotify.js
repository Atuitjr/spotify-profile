"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.token = exports.getAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
const setTokenTimestamp = () =>
	window.localStorage.setItem(
		"spotify_token_timestamp",
		Date.now().toString()
	);
const setLocalAccessToken = (token) => {
	setTokenTimestamp();
	window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token) =>
	window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () =>
	window.localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () =>
	window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
	window.localStorage.getItem("spotify_refresh_token");
// Refresh the token
const refreshAccessToken = () =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const { data } = yield axios_1.default.get(
				`/refresh_token?refresh_token=${getLocalRefreshToken()}`
			);
			const { access_token } = data;
			setLocalAccessToken(access_token);
			window.location.reload();
			return;
		} catch (e) {
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
//# sourceMappingURL=spotify.js.map
