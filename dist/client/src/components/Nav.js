"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const router_1 = require("@reach/router");
const spotify_1 = __importDefault(require("./icons/spotify"));
const user_1 = __importDefault(require("./icons/user"));
const time_1 = __importDefault(require("./icons/time"));
const microphone_1 = __importDefault(require("./icons/microphone"));
const playlist_1 = __importDefault(require("./icons/playlist"));
const music_1 = __importDefault(require("./icons/music"));
const github_1 = __importDefault(require("./icons/github"));
const macro_1 = __importDefault(require("styled-components/macro"));
const theme_1 = __importDefault(require("../styles/theme"));
const mixins_1 = __importDefault(require("../styles/mixins"));
const media_1 = __importDefault(require("../styles/media"));
const { colors } = theme_1.default;
const Container = macro_1.default.nav`
	${mixins_1.default.coverShadow};
	${mixins_1.default.flexBetween};
	flex-direction: column;
	min-height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	width: ${theme_1.default.navWidth};
	background-color: ${colors.navBlack};
	text-align: center;
	z-index: 99;
	${media_1.default.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: ${theme_1.default.navHeight};
    height: ${theme_1.default.navHeight};
    flex-direction: row;
  `};
	& > * {
		width: 100%;
		${media_1.default.tablet`
      height: 100%;
    `};
	}
`;
const Logo = macro_1.default.div`
	color: ${colors.green};
	margin-top: 30px;
	width: 70px;
	height: 70px;
	transition: ${theme_1.default.transition};
	${media_1.default.tablet`
    display: none;
  `};
	&:hover,
	&:focus {
		color: ${colors.offGreen};
	}
	svg {
		width: 50px;
	}
`;
const Github = macro_1.default.div`
	color: ${colors.lightGrey};
	width: 45px;
	height: 45px;
	margin-bottom: 30px;
	${media_1.default.tablet`
    display: none;
  `};
	a {
		&:hover,
		&:focus,
		&.active {
			color: ${colors.blue};
		}
		svg {
			width: 30px;
		}
	}
`;
const Menu = macro_1.default.ul`
	display: flex;
	flex-direction: column;
	${media_1.default.tablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
`;
const MenuItem = macro_1.default.li`
	color: ${colors.lightGrey};
	font-size: 11px;
	${media_1.default.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};
	a {
		display: block;
		padding: 15px 0;
		border-left: 5px solid transparent;
		width: 100%;
		height: 100%;
		${media_1.default.tablet`
      ${mixins_1.default.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 3px solid transparent;
    `};
		&:hover,
		&:focus,
		&.active {
			color: ${colors.white};
			background-color: ${colors.black};
			border-left: 5px solid ${colors.offGreen};
			${media_1.default.tablet`
        border-left: 0;
        border-top: 3px solid ${colors.offGreen};
      `};
		}
	}
	svg {
		width: 20px;
		height: 20px;
		margin-bottom: 7px;
	}
`;
const isActive = ({ isCurrent }) =>
	isCurrent ? { className: "active" } : null;
const NavLink = (props) =>
	react_1.default.createElement(
		router_1.Link,
		Object.assign({ getProps: isActive }, props)
	);
const Nav = () =>
	react_1.default.createElement(
		Container,
		null,
		react_1.default.createElement(
			Logo,
			null,
			react_1.default.createElement(
				router_1.Link,
				{ to: "/" },
				react_1.default.createElement(spotify_1.default, null)
			)
		),
		react_1.default.createElement(
			Menu,
			null,
			react_1.default.createElement(
				MenuItem,
				null,
				react_1.default.createElement(
					NavLink,
					{ to: "/" },
					react_1.default.createElement(user_1.default, null),
					react_1.default.createElement("div", null, "Profile")
				)
			),
			react_1.default.createElement(
				MenuItem,
				null,
				react_1.default.createElement(
					NavLink,
					{ to: "artists" },
					react_1.default.createElement(microphone_1.default, null),
					react_1.default.createElement("div", null, "Top Artists")
				)
			),
			react_1.default.createElement(
				MenuItem,
				null,
				react_1.default.createElement(
					NavLink,
					{ to: "tracks" },
					react_1.default.createElement(music_1.default, null),
					react_1.default.createElement("div", null, "Top Tracks")
				)
			),
			react_1.default.createElement(
				MenuItem,
				null,
				react_1.default.createElement(
					NavLink,
					{ to: "recent" },
					react_1.default.createElement(time_1.default, null),
					react_1.default.createElement("div", null, "Recent")
				)
			),
			react_1.default.createElement(
				MenuItem,
				null,
				react_1.default.createElement(
					NavLink,
					{ to: "playlists" },
					react_1.default.createElement(playlist_1.default, null),
					react_1.default.createElement("div", null, "Playlists")
				)
			)
		),
		react_1.default.createElement(
			Github,
			null,
			react_1.default.createElement(
				"a",
				{
					href: "https://github.com/atuitjr/spotify-profile",
					target: "_blank",
					rel: "noopener noreferrer",
				},
				react_1.default.createElement(github_1.default, null)
			)
		)
	);
exports.default = Nav;
//# sourceMappingURL=Nav.js.map
