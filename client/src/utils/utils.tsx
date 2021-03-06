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
// Get year from YYYY-MM-DD
export const getYear = (date: string) => date.split("-")[0];

// Transform Pitch Class Notation to string
export const parsePitchClass = (note: any) => {
	let key: string = note;

	switch (note) {
		case 0:
			key = "C";
			break;
		case 1:
			key = "D♭";
			break;
		case 2:
			key = "D";
			break;
		case 3:
			key = "E♭";
			break;
		case 4:
			key = "E";
			break;
		case 5:
			key = "F";
			break;
		case 6:
			key = "G♭";
			break;
		case 7:
			key = "G";
			break;
		case 8:
			key = "A♭";
			break;
		case 9:
			key = "A";
			break;
		case 10:
			key = "B♭";
			break;
		case 11:
			key = "B";
			break;
		default:
			return null;
	}

	return key;
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

export const formatWithCommas = (n: any) =>
	n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Higher-order function for async/await error handling
export const catchErrors = (fn: any) => {
	return function (...args: any[]) {
		return fn(...args).catch((err: any) => {
			console.error(err);
		});
	};
};
