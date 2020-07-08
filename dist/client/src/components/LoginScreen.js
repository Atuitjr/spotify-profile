"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const macro_1 = __importDefault(require("styled-components/macro"));
const theme_1 = __importDefault(require("../styles/theme"));
const mixins_1 = __importDefault(require("../styles/mixins"));
const Main_1 = __importDefault(require("../styles/Main"));
const { colors, fontSizes } = theme_1.default;
const LOGIN_URI =
	process.env.NODE_ENV !== "production"
		? "http://localhost:8888/login"
		: "https://spotify-profile.herokuapp.com/login";
const Login = macro_1.default(Main_1.default)`
	${mixins_1.default.flexCenter};
	flex-direction: column;
	min-height: 100vh;
	h1 {
		font-size: ${fontSizes.xxl};
	}
`;
const LoginButton = macro_1.default.a`
	display: inline-block;
	background-color: ${colors.green};
	color: ${colors.white};
	border-radius: 30px;
	padding: 17px 35px;
	margin: 20px 0 70px;
	min-width: 160px;
	font-weight: 700;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: center;
	&:hover,
	&:focus {
		background-color: ${colors.offGreen};
	}
`;
const LoginScreen = () =>
	react_1.default.createElement(
		Login,
		null,
		react_1.default.createElement("h1", null, "Spotify Profile"),
		react_1.default.createElement(
			LoginButton,
			{ href: LOGIN_URI },
			"Log in to Spotify"
		)
	);
exports.default = LoginScreen;
//# sourceMappingURL=LoginScreen.js.map
