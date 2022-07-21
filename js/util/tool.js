export const log = (...args) => {
	console.log(...args);
}

export const getType = (val) => {
	const toString = Object.prototype.toString;
	return toString.call(val).slice(8, -1).toLowerCase();
}