"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrors = exports.formatDurationForHumans = exports.formatDuration = exports.getHashParams = void 0;
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
// Format milliseconds into MM:SS
exports.formatDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};
// Format milliseconds into X minutes and Y seconds
exports.formatDurationForHumans = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes} Mins ${seconds} Secs`;
};
// Higher-order function for async/await error handling
exports.catchErrors = (fn) => {
    return function (...args) {
        return fn(...args).catch((err) => {
            console.error(err);
        });
    };
};
//# sourceMappingURL=utils.js.map