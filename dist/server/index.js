"use strict";
// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:8888/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
const PORT = process.env.PORT || 8888;
if (process.env.NODE_ENV !== "production") {
    REDIRECT_URI = "http://localhost:8888/callback";
    FRONTEND_URI = "http://localhost:3000";
}
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const cors_1 = __importDefault(require("cors"));
const querystring_1 = __importDefault(require("querystring"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cluster_1 = __importDefault(require("cluster"));
const numCPUs = require("os").cpus().length;
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
const stateKey = "spotify_auth_state";
// Multi-process to utilize all CPU cores.
if (cluster_1.default.isMaster) {
    console.warn(`Node cluster master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
}
else {
    const app = express_1.default();
    // Priority serve any static files.
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")))
        .use(cors_1.default())
        .use(cookie_parser_1.default())
        .use(connect_history_api_fallback_1.default({
        verbose: true,
        rewrites: [
            { from: /\/login/, to: "/login" },
            { from: /\/callback/, to: "/callback" },
            { from: /\/refresh_token/, to: "/refresh_token" },
        ],
    }))
        .use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
    app.get("/", function (req, res) {
        res.render(path_1.default.resolve(__dirname, "../client/build/index.html"));
    });
    app.get("/login", (req, res) => {
        const state = generateRandomString(16);
        res.cookie(stateKey, state);
        // your application requests authorization
        const scope = "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";
        res.redirect(`https://accounts.spotify.com/authorize?${querystring_1.default.stringify({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
        })}`);
    });
    app.get("/callback", (req, res) => {
        // your application requests refresh and access tokens
        // after checking the state parameter
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;
        if (state === null || state !== storedState) {
            res.redirect(`/#${querystring_1.default.stringify({ error: "state_mismatch" })}`);
        }
        else {
            res.clearCookie(stateKey);
            const authOptions = {
                url: "https://accounts.spotify.com/api/token",
                form: {
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    grant_type: "authorization_code",
                },
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
                },
                json: true,
            };
            request_1.default.post(authOptions, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const access_token = body.access_token;
                    const refresh_token = body.refresh_token;
                    // we can also pass the token to the browser to make requests from there
                    res.redirect(`${FRONTEND_URI}/#${querystring_1.default.stringify({
                        access_token,
                        refresh_token,
                    })}`);
                }
                else {
                    res.redirect(`/#${querystring_1.default.stringify({ error: "invalid_token" })}`);
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
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
            },
            form: {
                grant_type: "refresh_token",
                refresh_token,
            },
            json: true,
        };
        request_1.default.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                res.send({ access_token });
            }
        });
    });
    // All remaining requests return the React app, so it can handle routing.
    app.get("*", (request, response) => {
        response.sendFile(path_1.default.resolve(__dirname, "../client/public", "index.html"));
    });
    app.listen(PORT, () => {
        console.warn(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map