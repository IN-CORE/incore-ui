// Tools the copilot can call. Each one drives the real viewer through its registered
// controller (see bridge.js), so the user watches the page change, and returns a short
// JSON summary for the model. Definitions use the OpenAI function-calling format, which
// is what the Lumen gateway speaks; webmcp.js registers the same tools with WebMCP.
//
// Everything a user can do in the viewers is covered except deleting.

import { browserHistory } from "react-router";
import { getController, waitFor, waitForLoad } from "./bridge";

const PAGES = {
	Home: "/",
	DataViewer: "/DataViewer",
	HazardViewer: "/HazardViewer",
	DFR3Viewer: "/DFR3Viewer",
	SemanticViewer: "/SemanticViewer",
	Profile: "/Profile"
};
const HAZARD_TYPES = ["earthquakes", "tornadoes", "hurricanes", "tsunamis", "floods"];
const DFR3_TYPES = ["fragilities", "restorations", "repairs"];
const DFR3_HAZARD_TYPES = [
	"All",
	"earthquake",
	"tornado",
	"hurricane",
	"hurricaneWindfield",
	"earthquake%2btsunami",
	"tsunami",
	"flood"
];
const INVENTORY_TYPES = [
	"All",
	"building",
	"bridge",
	"roadway",
	"electric_facility",
	"electric_power_line",
	"water_facility",
	"buried_pipeline",
	"gas_facility"
];
const PAGE_SIZES = [15, 30, 50, 75, 100];
// Lists can hold 100 records; the model only needs enough to pick from.
const MAX_ITEMS = 20;

const SPACE_PARAM = {
	type: "string",
	description: "Space name to filter by; get_current_view lists the available ones. Omit for all spaces."
};

function currentPage() {
	const path = window.location.pathname.replace(/\/$/, "") || "/";
	const name = Object.keys(PAGES).find((page) => PAGES[page].toLowerCase() === path.toLowerCase());
	return name || path;
}

function trimItems(state) {
	if (!Array.isArray(state.items)) {
		return state;
	}
	return { ...state, items: state.items.slice(0, MAX_ITEMS), items_on_page: state.items.length };
}

// The open page's controller, or an error naming the pages that have one.
function currentController(...pages) {
	const page = currentPage();
	const controller = getController(page);
	if (!controller || (pages.length && !pages.includes(page))) {
		throw new Error(
			`This needs ${pages.length ? pages.join(" or ") : "a viewer"} to be open; the user is on ${page}.`
		);
	}
	return { page, controller };
}

// Navigates to a viewer if needed and waits until it has mounted and loaded its list.
async function openViewer(page) {
	if (currentPage() !== page) {
		browserHistory.push(PAGES[page]);
	}
	await waitFor(() => getController(page));
	return waitForLoad(page);
}

// Runs an action that refetches the list, then returns the refreshed view.
async function reload(page, action) {
	await action();
	return trimItems(await waitForLoad(page));
}

function view(page) {
	return trimItems(getController(page).getState());
}

// Runs an action on the open viewer, then returns what changed on screen.
async function act(action, ...pages) {
	const { page, controller } = currentController(...pages);
	await action(controller);
	return view(page);
}

export const tools = [
	// --- Any page ---
	{
		name: "get_current_view",
		description:
			"Describe what the user is looking at: the current page and, on a viewer, its filters, page, listed " +
			"items, selected item and the spaces and data types available as filters.",
		parameters: { type: "object", properties: {} },
		run: async () => {
			const page = currentPage();
			return getController(page) ? { page, ...view(page) } : { page };
		}
	},
	{
		name: "open_page",
		description: "Navigate the IN-CORE web app to a page and return what it shows once loaded.",
		parameters: {
			type: "object",
			properties: { page: { type: "string", enum: Object.keys(PAGES) } },
			required: ["page"]
		},
		run: async ({ page }) => {
			if (!PAGES[page]) {
				throw new Error(`Unknown page ${page}.`);
			}
			if (page === "Home") {
				browserHistory.push(PAGES.Home);
				return { page };
			}
			return { page, ...trimItems(await openViewer(page)) };
		}
	},
	{
		name: "change_page",
		description: "Go to the next or previous page of the list in the open viewer.",
		parameters: {
			type: "object",
			properties: {
				direction: { type: "string", enum: ["next", "previous"] },
				list: {
					type: "string",
					enum: ["curves", "mappings"],
					description: "DFR3 viewer only: which list to page. Defaults to curves."
				}
			},
			required: ["direction"]
		},
		run: async ({ direction, list }) => {
			const { page, controller } = currentController();
			if (!controller.page) {
				throw new Error(`${page} has no pages.`);
			}
			return reload(page, () => controller.page(direction, list));
		}
	},
	{
		name: "set_page_size",
		description: "Set how many items the open viewer lists per page.",
		parameters: {
			type: "object",
			properties: { size: { type: "integer", enum: PAGE_SIZES } },
			required: ["size"]
		},
		run: async ({ size }) => {
			if (!PAGE_SIZES.includes(size)) {
				throw new Error(`Page size must be one of ${PAGE_SIZES.join(", ")}.`);
			}
			const { page, controller } = currentController(
				"HazardViewer",
				"DataViewer",
				"DFR3Viewer",
				"SemanticViewer"
			);
			return reload(page, () => controller.setPageSize(size));
		}
	},
	{
		name: "close_details",
		description: "Close the details panel of the selected item in the open viewer.",
		parameters: { type: "object", properties: {} },
		run: () => act((c) => c.closeDetails(), "HazardViewer", "DataViewer", "DFR3Viewer", "SemanticViewer")
	},
	{
		name: "close_preview",
		description: "Close the preview dialog (map, table or plot) in the open viewer.",
		parameters: { type: "object", properties: {} },
		run: () => act((c) => c.closePreview(), "HazardViewer", "DataViewer", "DFR3Viewer")
	},
	{
		name: "export_json",
		description:
			"Download the selected item's metadata as a JSON file to the user's computer (the viewer's " +
			"Download Metadata / Download Definition button).",
		parameters: {
			type: "object",
			properties: {
				kind: {
					type: "string",
					enum: ["curve", "mapping"],
					description: "DFR3 viewer only: export the selected curve or mapping. Defaults to curve."
				}
			}
		},
		run: async ({ kind }) => {
			const { page, controller } = currentController(
				"HazardViewer",
				"DataViewer",
				"DFR3Viewer",
				"SemanticViewer"
			);
			await controller.exportJson(kind);
			return { page, downloaded: true };
		}
	},
	{
		name: "download_files",
		description:
			"Download to the user's computer: on the data viewer, the selected dataset's files as a zip; on the " +
			"semantic viewer, the selected semantic type's template.",
		parameters: { type: "object", properties: {} },
		run: async () => {
			const { page, controller } = currentController("DataViewer", "SemanticViewer");
			await controller.download();
			return { page, downloaded: true };
		}
	},

	// --- Hazard viewer ---
	{
		name: "show_hazards",
		description:
			"Open the hazard viewer and list hazards of one type, optionally filtered by space or by a search " +
			"keyword (matched against name and description, e.g. a place name). A keyword ignores the space filter.",
		parameters: {
			type: "object",
			properties: {
				hazard_type: { type: "string", enum: HAZARD_TYPES },
				keyword: { type: "string", description: "Search text. Omit to list all hazards of the type." },
				space: SPACE_PARAM
			},
			required: ["hazard_type"]
		},
		run: async ({ hazard_type, keyword, space }) => {
			await openViewer("HazardViewer");
			const controller = getController("HazardViewer");
			return reload("HazardViewer", () => controller.show({ hazardType: hazard_type, keyword, space }));
		}
	},
	{
		name: "select_hazard",
		description:
			"Select a hazard listed in the hazard viewer so its details open on screen. Returns the details, " +
			"including its hazard datasets. Call show_hazards first so the hazard is in the list.",
		parameters: {
			type: "object",
			properties: { hazard_id: { type: "string" } },
			required: ["hazard_id"]
		},
		run: async ({ hazard_id }) => {
			const { controller } = currentController("HazardViewer");
			controller.select(hazard_id);
			return waitFor(() => controller.getState().selected);
		}
	},
	{
		name: "preview_hazard_dataset",
		description:
			"Show one of the selected hazard's datasets (e.g. a raster) on a map. Use a datasetId from the " +
			"selected hazard's details.",
		parameters: {
			type: "object",
			properties: { dataset_id: { type: "string" } },
			required: ["dataset_id"]
		},
		run: async ({ dataset_id }) => {
			const { controller } = currentController("HazardViewer");
			await controller.preview(dataset_id);
			if (!controller.getState().preview_open) {
				throw new Error(`Could not preview dataset ${dataset_id}; it may not exist or not be accessible.`);
			}
			return { previewing: dataset_id };
		}
	},

	// --- Data viewer ---
	{
		name: "show_datasets",
		description:
			"Open the data viewer and list datasets, either matching a search keyword or filtered by data type " +
			"(e.g. ergo:buildingInventoryVer7) and/or space. A keyword ignores the other filters.",
		parameters: {
			type: "object",
			properties: {
				keyword: { type: "string", description: "Search text matched against dataset name and description." },
				data_type: { type: "string", description: "Exact IN-CORE data type. Omit for all types." },
				space: SPACE_PARAM
			}
		},
		run: async ({ keyword, data_type, space }) => {
			await openViewer("DataViewer");
			const controller = getController("DataViewer");
			return reload("DataViewer", () => controller.show({ keyword, dataType: data_type, space }));
		}
	},
	{
		name: "select_dataset",
		description:
			"Select a dataset listed in the data viewer so its details open on screen. Returns the details, " +
			"including its files. Call show_datasets first so the dataset is in the list.",
		parameters: {
			type: "object",
			properties: { dataset_id: { type: "string" } },
			required: ["dataset_id"]
		},
		run: async ({ dataset_id }) => {
			currentController("DataViewer").controller.select(dataset_id);
			return waitFor(() => getController("DataViewer").getState().selected);
		}
	},
	{
		name: "view_dataset_file",
		description:
			"Open one of the selected dataset's files in the data viewer and return its first lines. Use a file " +
			"id from the selected dataset's fileDescriptors.",
		parameters: {
			type: "object",
			properties: { file_id: { type: "string" } },
			required: ["file_id"]
		},
		run: async ({ file_id }) => {
			await currentController("DataViewer").controller.viewFile(file_id);
			return { file_id, first_lines: getController("DataViewer").getState().file_preview };
		}
	},
	{
		name: "preview_dataset",
		description: "Open the preview of the selected dataset: a map for spatial data, a table or a network view.",
		parameters: { type: "object", properties: {} },
		run: () => act((c) => c.openPreview(), "DataViewer")
	},

	// --- DFR3 viewer ---
	{
		name: "show_dfr3",
		description:
			"Open the DFR3 viewer and list fragility, restoration or repair curves and their mappings, filtered " +
			"by hazard type, inventory type and space, or by a search keyword (which ignores those filters).",
		parameters: {
			type: "object",
			properties: {
				dfr3_type: { type: "string", enum: DFR3_TYPES },
				hazard_type: { type: "string", enum: DFR3_HAZARD_TYPES },
				inventory_type: { type: "string", enum: INVENTORY_TYPES },
				space: SPACE_PARAM,
				keyword: { type: "string", description: "Search text matched against names, descriptions, authors." }
			},
			required: ["dfr3_type"]
		},
		run: async ({ dfr3_type, hazard_type, inventory_type, space, keyword }) => {
			await openViewer("DFR3Viewer");
			const controller = getController("DFR3Viewer");
			return reload("DFR3Viewer", () =>
				controller.show({
					dfr3Type: dfr3_type,
					hazardType: hazard_type,
					inventoryType: inventory_type,
					space,
					keyword
				})
			);
		}
	},
	{
		name: "switch_dfr3_tab",
		description: "Switch the DFR3 viewer between its curves list and its mappings list.",
		parameters: {
			type: "object",
			properties: { tab: { type: "string", enum: ["curves", "mappings"] } },
			required: ["tab"]
		},
		run: ({ tab }) => act((c) => c.setTab(tab), "DFR3Viewer")
	},
	{
		name: "select_dfr3_curve",
		description:
			"Select a curve in the DFR3 viewer so its details and plot open on screen. Returns its details. " +
			"Call show_dfr3 first so the curve is in the list.",
		parameters: {
			type: "object",
			properties: { curve_id: { type: "string" } },
			required: ["curve_id"]
		},
		run: async ({ curve_id }) => {
			await currentController("DFR3Viewer").controller.select("curve", curve_id);
			return waitFor(() => getController("DFR3Viewer").getState().selected_curve);
		}
	},
	{
		name: "select_dfr3_mapping",
		description:
			"Select a mapping in the DFR3 viewer so its rules open on screen. Returns its details. " +
			"Call show_dfr3 first so the mapping is in the list.",
		parameters: {
			type: "object",
			properties: { mapping_id: { type: "string" } },
			required: ["mapping_id"]
		},
		run: async ({ mapping_id }) => {
			await currentController("DFR3Viewer").controller.select("mapping", mapping_id);
			return waitFor(() => getController("DFR3Viewer").getState().selected_mapping);
		}
	},
	{
		name: "plot_dfr3_curve",
		description: "Open the large plot of the selected DFR3 curve.",
		parameters: { type: "object", properties: {} },
		run: () => act((c) => c.openPreview(), "DFR3Viewer")
	},

	// --- Semantic viewer ---
	{
		name: "show_semantic_types",
		description:
			"Open the semantic viewer and list semantic (data) types, filtered by space or by a search keyword " +
			"(which ignores the space filter), e.g. buildingInventory.",
		parameters: {
			type: "object",
			properties: {
				keyword: { type: "string", description: "Search text matched against the type name." },
				space: SPACE_PARAM
			}
		},
		run: async ({ keyword, space }) => {
			await openViewer("SemanticViewer");
			const controller = getController("SemanticViewer");
			return reload("SemanticViewer", () => controller.show({ keyword, space }));
		}
	},
	{
		name: "select_semantic_type",
		description:
			"Select a semantic type in the semantic viewer so its column schema opens on screen. Returns the " +
			"schema. Use the exact name from the list, e.g. ergo:buildingInventoryVer7.",
		parameters: {
			type: "object",
			properties: { name: { type: "string" } },
			required: ["name"]
		},
		run: async ({ name }) => {
			currentController("SemanticViewer").controller.select(name);
			return waitFor(() => getController("SemanticViewer").getState().selected);
		}
	},

	// --- Profile ---
	{
		name: "get_usage",
		description:
			"Open the user's profile page and return their storage and entity usage against their allocations.",
		parameters: { type: "object", properties: {} },
		run: async () => {
			await openViewer("Profile");
			return getController("Profile").getState();
		}
	}
];
