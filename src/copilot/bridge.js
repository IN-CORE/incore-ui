// Lets the copilot drive the page the user is looking at.
//
// A viewer registers a controller while it is mounted: plain functions that call the
// viewer's own handlers, so the dropdowns, search box and selection change on screen
// exactly as if the user had clicked them. Tools look the controller up by page name.

const controllers = {};

export function registerController(page, controller) {
	controllers[page] = controller;
	return () => {
		if (controllers[page] === controller) {
			delete controllers[page];
		}
	};
}

export function getController(page) {
	return controllers[page];
}

// Space names as the space filter dropdowns list them.
export function spaceNames(spaces) {
	return (spaces || []).map((space) => space.metadata.name);
}

// Mirrors the viewers' pagination buttons, which are disabled at either end.
export function checkPage(direction, pageNumber, itemsOnPage, pageSize) {
	if (direction === "previous" && pageNumber <= 1) {
		throw new Error("Already on the first page.");
	}
	if (direction === "next" && itemsOnPage < pageSize) {
		throw new Error("Already on the last page.");
	}
	if (direction !== "next" && direction !== "previous") {
		throw new Error(`Unknown direction ${direction}.`);
	}
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Waits for check() to return something truthy, e.g. a viewer to mount or a fetch to land.
export async function waitFor(check, { timeout = 15000, interval = 100 } = {}) {
	const start = Date.now();
	while (Date.now() - start < timeout) {
		const value = check();
		if (value) {
			return value;
		}
		await sleep(interval);
	}
	throw new Error("Timed out waiting for the page to update.");
}

// Waits for a controller's list to finish loading after an action that refetches it.
export async function waitForLoad(page) {
	// The fetch starts on the next render; give it a moment to flip loading on.
	await sleep(300);
	await waitFor(() => getController(page) && !getController(page).getState().loading);
	return getController(page).getState();
}
