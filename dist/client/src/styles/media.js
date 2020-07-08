"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.media = void 0;
const styled_components_1 = require("styled-components");
const sizes = {
	giant: 1440,
	desktop: 1200,
	netbook: 1000,
	tablet: 768,
	thone: 600,
	phablet: 480,
	phone: 376,
	tiny: 330,
};
// iterate through the sizes and create a media template
exports.media = Object.keys(sizes).reduce((accumulator, label) => {
	// use em in breakpoints to work properly cross-browser and support users
	// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
	const emSize = sizes[label] / 16;
	accumulator[label] = (first, ...args) => styled_components_1.css`
			@media (max-width: ${emSize}em) {
				${styled_components_1.css(first, ...args)};
			}
		`;
	return accumulator;
}, {});
exports.default = exports.media;
//# sourceMappingURL=media.js.map
