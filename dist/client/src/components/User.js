"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const router_1 = require("@reach/router");
const spotify_1 = require("../spotify/spotify");
const utils_1 = require("../utils/utils");
const user_1 = __importDefault(require("./icons/user"));
const info_1 = __importDefault(require("./icons/info"));
const Loader_1 = __importDefault(require("./Loader"));
const TrackItem_1 = __importDefault(require("./TrackItem"));
const macro_1 = __importDefault(require("styled-components/macro"));
const theme_1 = __importDefault(require("../styles/theme"));
const mixins_1 = __importDefault(require("../styles/mixins"));
const media_1 = __importDefault(require("../styles/media"));
const Main_1 = __importDefault(require("../styles/Main"));
const { colors, fontSizes, spacing } = theme_1.default;
const Header = macro_1.default.header `
	${mixins_1.default.flexCenter};
	flex-direction: column;
	position: relative;
`;
const Avatar = macro_1.default.div `
	width: 150px;
	height: 150px;
	img {
		border-radius: 100%;
	}
`;
const NoAvatar = macro_1.default.div `
	border: 2px solid currentColor;
	border-radius: 100%;
	padding: ${spacing.md};
`;
const UserName = macro_1.default.a `
	&:hover,
	&:focus {
		color: ${colors.offGreen};
	}
`;
const Name = macro_1.default.h1 `
	font-size: 50px;
	font-weight: 700;
	margin: 20px 0 0;
	${media_1.default.tablet `
    font-size: 40px;
  `};
	${media_1.default.phablet `
    font-size: 8vw;
  `};
`;
const Stats = macro_1.default.div `
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
	margin-top: ${spacing.base};
`;
const Stat = macro_1.default.div `
	text-align: center;
`;
const Number = macro_1.default.div `
	color: ${colors.green};
	font-weight: 700;
	font-size: ${fontSizes.md};
`;
const NumLabel = macro_1.default.p `
	color: ${colors.lightGrey};
	font-size: ${fontSizes.xs};
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-top: ${spacing.xs};
`;
const LogoutButton = macro_1.default.a `
	background-color: transparent;
	color: ${colors.white};
	border: 1px solid ${colors.white};
	border-radius: 30px;
	margin-top: 30px;
	padding: 12px 30px;
	font-size: ${fontSizes.xs};
	font-weight: 700;
	letter-spacing: 1px;
	text-transform: uppercase;
	text-align: center;
	&:hover,
	&:focus {
		background-color: ${colors.white};
		color: ${colors.black};
	}
`;
const Preview = macro_1.default.section `
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 70px;
	width: 100%;
	margin-top: 100px;
	${media_1.default.tablet `
    display: block;
    margin-top: 70px;
  `};
`;
const Tracklist = macro_1.default.div `
	${media_1.default.tablet `
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;
const TracklistHeading = macro_1.default.div `
	${mixins_1.default.flexBetween};
	margin-bottom: 40px;
	h3 {
		display: inline-block;
		margin: 0;
	}
`;
const MoreButton = macro_1.default(router_1.Link) `
	${mixins_1.default.button};
	text-align: center;
	white-space: nowrap;
	${media_1.default.phablet `
    padding: 11px 20px;
    font-sizes: ${fontSizes.xs};
  `};
`;
const Mask = macro_1.default.div `
	${mixins_1.default.flexCenter};
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	color: ${colors.white};
	opacity: 0;
	transition: ${theme_1.default.transition};
	svg {
		width: 25px;
	}
`;
const Artist = macro_1.default.li `
	display: flex;
	align-items: center;
	margin-bottom: ${spacing.md};
	${media_1.default.tablet `
    margin-bottom: ${spacing.base};
  `};
	&:hover,
	&:focus {
		${Mask} {
			opacity: 1;
		}
	}
`;
const ArtistArtwork = macro_1.default(router_1.Link) `
	display: inline-block;
	position: relative;
	width: 50px;
	min-width: 50px;
	margin-right: ${spacing.base};
	img {
		width: 50px;
		min-width: 50px;
		height: 50px;
		margin-right: ${spacing.base};
		border-radius: 100%;
	}
`;
const ArtistName = macro_1.default(router_1.Link) `
	flex-grow: 1;
	span {
		border-bottom: 1px solid transparent;
		&:hover,
		&:focus {
			border-bottom: 1px solid ${colors.white};
		}
	}
`;
class User extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            user: null,
            followedArtists: null,
            playlists: null,
            topArtists: null,
            topTracks: null,
        };
    }
    componentDidMount() {
        utils_1.catchErrors(this.getData());
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, followedArtists, playlists, topArtists, topTracks, } = yield spotify_1.getUserInfo();
            this.setState({
                user,
                followedArtists,
                playlists,
                topArtists,
                topTracks,
            });
        });
    }
    render() {
        const { user, followedArtists, playlists, topArtists, topTracks, } = this.state;
        const totalPlaylists = playlists ? playlists.total : 0;
        return (react_1.default.createElement(react_1.default.Fragment, null, user ? (react_1.default.createElement(Main_1.default, null,
            react_1.default.createElement(Header, null,
                react_1.default.createElement(Avatar, null, user.images.length > 0 ? (react_1.default.createElement("img", { src: user.images[0].url, alt: "avatar" })) : (react_1.default.createElement(NoAvatar, null,
                    react_1.default.createElement(user_1.default, null)))),
                react_1.default.createElement(UserName, { href: user.external_urls.spotify, target: "_blank", rel: "noopener noreferrer" },
                    react_1.default.createElement(Name, null, user.display_name)),
                react_1.default.createElement(Stats, null,
                    react_1.default.createElement(Stat, null,
                        react_1.default.createElement(Number, null, user.followers.total),
                        react_1.default.createElement(NumLabel, null, "Followers")),
                    followedArtists && (react_1.default.createElement(Stat, null,
                        react_1.default.createElement(Number, null, followedArtists.artists.items
                            .length),
                        react_1.default.createElement(NumLabel, null, "Following"))),
                    totalPlaylists && (react_1.default.createElement(Stat, null,
                        react_1.default.createElement(router_1.Link, { to: "playlists" },
                            react_1.default.createElement(Number, null, totalPlaylists),
                            react_1.default.createElement(NumLabel, null, "Playlists"))))),
                react_1.default.createElement(LogoutButton, { onClick: spotify_1.logout }, "Logout")),
            react_1.default.createElement(Preview, null,
                react_1.default.createElement(Tracklist, null,
                    react_1.default.createElement(TracklistHeading, null,
                        react_1.default.createElement("h3", null, "Top Artists of All Time"),
                        react_1.default.createElement(MoreButton, { to: "/artists" }, "See More")),
                    react_1.default.createElement("div", null, topArtists ? (react_1.default.createElement("ul", null, topArtists.items
                        .slice(0, 10)
                        .map((artist, i) => (react_1.default.createElement(Artist, { key: i },
                        react_1.default.createElement(ArtistArtwork, { to: `/artist/${artist.id}` },
                            artist.images
                                .length && (react_1.default.createElement("img", { src: artist
                                    .images[2]
                                    .url, alt: "Artist" })),
                            react_1.default.createElement(Mask, null,
                                react_1.default.createElement(info_1.default, null))),
                        react_1.default.createElement(ArtistName, { to: `/artist/${artist.id}` },
                            react_1.default.createElement("span", null, artist.name))))))) : (react_1.default.createElement(Loader_1.default, null)))),
                react_1.default.createElement(Tracklist, null,
                    react_1.default.createElement(TracklistHeading, null,
                        react_1.default.createElement("h3", null, "Top Tracks of All Time"),
                        react_1.default.createElement(MoreButton, { to: "/tracks" }, "See More")),
                    react_1.default.createElement("ul", null, topTracks ? (topTracks.items
                        .slice(0, 10)
                        .map((track, i) => (react_1.default.createElement(TrackItem_1.default, { track: track, key: i })))) : (react_1.default.createElement(Loader_1.default, null))))))) : (react_1.default.createElement(Loader_1.default, null))));
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map