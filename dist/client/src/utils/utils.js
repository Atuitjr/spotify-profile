"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashParams = void 0;
// Get the query params off the window's URL
exports.getHashParams = () => {
	const hashParams = {};
	let e;
	const r = /([^&;=]+)=?([^&;]*)/g;
	const q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};
//# sourceMappingURL=utils.js.map
