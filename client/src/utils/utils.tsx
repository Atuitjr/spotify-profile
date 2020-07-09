// Get the query params off the window's URL
export const getHashParams = () => {
	const hashParams: any = {};
	let e;
	const r = /([^&;=]+)=?([^&;]*)/g;
	const q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};

// Format milliseconds into MM:SS
export const formatDuration = (millis: number) => {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};

// Format milliseconds into X minutes and Y seconds
export const formatDurationForHumans = (millis: number) => {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return `${minutes} Mins ${seconds} Secs`;
};

// Higher-order function for async/await error handling
export const catchErrors = (fn: any) => {
	return function (...args: any[]) {
		return fn(...args).catch((err: any) => {
			console.error(err);
		});
	};
};
