"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const router_1 = require("@reach/router");
const utils_1 = require("../utils/utils");
const info_1 = __importDefault(require("./icons/info"));
const macro_1 = __importDefault(require("styled-components/macro"));
const theme_1 = __importDefault(require("../styles/theme"));
const mixins_1 = __importDefault(require("../styles/mixins"));
const media_1 = __importDefault(require("../styles/media"));
const { colors, fontSizes, spacing } = theme_1.default;
const TrackLeft = macro_1.default.span `
	${mixins_1.default.overflowEllipsis};
`;
const TrackRight = macro_1.default.span ``;
const TrackArtwork = macro_1.default.div `
	display: inline-block;
	position: relative;
	width: 50px;
	min-width: 50px;
	margin-right: ${spacing.base};
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
const TrackContainer = macro_1.default(router_1.Link) `
	display: grid;
	grid-template-columns: auto 1fr;
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
const TrackMeta = macro_1.default.div `
	display: grid;
	grid-template-columns: 1fr max-content;
	grid-gap: 10px;
`;
const TrackName = macro_1.default.span `
	margin-bottom: 5px;
	border-bottom: 1px solid transparent;
	&:hover,
	&:focus {
		border-bottom: 1px solid ${colors.white};
	}
`;
const TrackAlbum = macro_1.default.div `
	${mixins_1.default.overflowEllipsis};
	color: ${colors.lightGrey};
	font-size: ${fontSizes.sm};
	margin-top: 3px;
`;
const TrackDuration = macro_1.default.span `
	color: ${colors.lightGrey};
	font-size: ${fontSizes.sm};
`;
const TrackItem = ({ track }) => (react_1.default.createElement("li", null,
    react_1.default.createElement(TrackContainer, { to: `/track/${track.id}` },
        react_1.default.createElement("div", null,
            react_1.default.createElement(TrackArtwork, null,
                track.album.images.length && (react_1.default.createElement("img", { src: track.album.images[2].url, alt: "Album Artwork" })),
                react_1.default.createElement(Mask, null,
                    react_1.default.createElement(info_1.default, null)))),
        react_1.default.createElement(TrackMeta, null,
            react_1.default.createElement(TrackLeft, null,
                track.name && react_1.default.createElement(TrackName, null, track.name),
                track.artists && track.album && (react_1.default.createElement(TrackAlbum, null,
                    track.artists &&
                        track.artists.map(({ name }, i) => (react_1.default.createElement("span", { key: i },
                            name,
                            track.artists.length > 0 &&
                                i === track.artists.length - 1
                                ? ""
                                : ",",
                            "\u00A0"))),
                    "\u00A0\u00B7\u00A0\u00A0",
                    track.album.name))),
            react_1.default.createElement(TrackRight, null, track.duration_ms && (react_1.default.createElement(TrackDuration, null, utils_1.formatDuration(track.duration_ms))))))));
TrackItem.propTypes = {
    track: prop_types_1.default.object.isRequired,
};
exports.default = TrackItem;
//# sourceMappingURL=TrackItem.js.map