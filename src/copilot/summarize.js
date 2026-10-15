// Shrinks an IN-CORE record to what the model needs to talk about it. Full records carry
// nested privileges, spaces and dataset lists that cost tokens and add nothing.

const SKIP = ["privileges", "spaces", "deleted"];
const MAX_TEXT = 300;

export function summarize(record, { detail = false } = {}) {
	const out = {};
	Object.keys(record || {}).forEach((key) => {
		const value = record[key];
		if (SKIP.includes(key) || value === null || value === undefined || value === "") {
			return;
		}
		if (typeof value === "string") {
			out[key] = value.length > MAX_TEXT ? `${value.slice(0, MAX_TEXT)}…` : value;
		} else if (typeof value === "number" || typeof value === "boolean") {
			out[key] = value;
		} else if (detail && Array.isArray(value)) {
			out[key] =
				value.length <= 10
					? value.map((item) => (typeof item === "object" ? summarize(item) : item))
					: `${value.length} items`;
		} else if (detail && typeof value === "object") {
			out[key] = summarize(value);
		}
	});
	return out;
}
