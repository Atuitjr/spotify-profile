// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples

require("dotenv").config();

const CLIENT_ID: string = process.env.CLIENT_ID;
const CLIENT_SECRET: string = process.env.CLIENT_SECRET;
let REDIRECT_URI: string =
	process.env.REDIRECT_URI || "http://localhost:8888/callback";
let FRONTEND_URI: string = process.env.FRONTEND_URI || "http://localhost:3000";
const PORT: string | number = process.env.PORT || 8888;

if (process.env.NODE_ENV !== "production") {
	REDIRECT_URI = "http://localhost:8888/callback";
	FRONTEND_URI = "http://localhost:3000";
}

import express from "express";
import request from "request";
import cors from "cors";
import querystring from "querystring";
import cookieParser from "cookie-parser";
import path from "path";
import cluster from "cluster";
const numCPUs = require("os").cpus().length;
import history from "connect-history-api-fallback";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length: number): string => {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const stateKey = "spotify_auth_state";

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
	console.warn(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.error(
			`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
		);
	});
} else {
	const app = express();

	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, "../client/build")));

	app.use(express.static(path.resolve(__dirname, "../client/build")))
		.use(cors())
		.use(cookieParser())
		.use(
			history({
				verbose: true,
				rewrites: [
					{ from: /\/login/, to: "/login" },
					{ from: /\/callback/, to: "/callback" },
					{ from: /\/refresh_token/, to: "/refresh_token" },
				],
			})
		)
		.use(express.static(path.resolve(__dirname, "../client/build")));

	app.get("/", function (req, res) {
		res.render(path.resolve(__dirname, "../client/build/index.html"));
	});

	app.get("/login", (req, res) => {
		const state = generateRandomString(16);
		res.cookie(stateKey, state);

		// your application requests authorization
		const scope =
			"user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

		res.redirect(
			`https://accounts.spotify.com/authorize?${querystring.stringify({
				response_type: "code",
				client_id: CLIENT_ID,
				scope: scope,
				redirect_uri: REDIRECT_URI,
				state: state,
			})}`
		);
	});

	app.get("/callback", (req, res) => {
		// your application requests refresh and access tokens
		// after checking the state parameter

		const code = req.query.code || null;
		const state = req.query.state || null;
		const storedState = req.cookies ? req.cookies[stateKey] : null;

		if (state === null || state !== storedState) {
			res.redirect(
				`/#${querystring.stringify({ error: "state_mismatch" })}`
			);
		} else {
			res.clearCookie(stateKey);
			const authOptions = {
				url: "https://accounts.spotify.com/api/token",
				form: {
					code: code,
					redirect_uri: REDIRECT_URI,
					grant_type: "authorization_code",
				},
				headers: {
					Authorization: `Basic ${Buffer.from(
						`${CLIENT_ID}:${CLIENT_SECRET}`
					).toString("base64")}`,
				},
				json: true,
			};

			request.post(authOptions, (error, response, body) => {
				if (!error && response.statusCode === 200) {
					const access_token = body.access_token;
					const refresh_token = body.refresh_token;

					// we can also pass the token to the browser to make requests from there
					res.redirect(
						`${FRONTEND_URI}/#${querystring.stringify({
							access_token,
							refresh_token,
						})}`
					);
				} else {
					res.redirect(
						`/#${querystring.stringify({ error: "invalid_token" })}`
					);
				}
			});
		}
	});

	app.get("/refresh_token", (req, res) => {
		// requesting access token from refresh token
		const refresh_token = req.query.refresh_token;
		const authOptions = {
			url: "https://accounts.spotify.com/api/token",
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${CLIENT_ID}:${CLIENT_SECRET}`
				).toString("base64")}`,
			},
			form: {
				grant_type: "refresh_token",
				refresh_token,
			},
			json: true,
		};

		request.post(authOptions, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				const access_token = body.access_token;
				res.send({ access_token });
			}
		});
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get("*", (request, response) => {
		response.sendFile(
			path.resolve(__dirname, "../client/public", "index.html")
		);
	});

	app.listen(PORT, () => {
		console.warn(
			`Node cluster worker ${process.pid}: listening on port ${PORT}`
		);
	});
}
