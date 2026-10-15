// Registers the copilot tools with WebMCP when the browser offers it (Chrome behind
// chrome://flags/#enable-webmcp-testing or its origin trial), so a browser agent such as
// Gemini in Chrome can drive the app with the same tools as the built-in panel.
//
// The API is an early draft: it has appeared as both navigator.modelContext and
// document.modelContext. Browsers without it skip this entirely.

import { tools } from "./tools";

export function registerWebMcpTools() {
	const modelContext = document.modelContext || navigator.modelContext;
	if (!modelContext || typeof modelContext.registerTool !== "function") {
		return;
	}
	tools.forEach(({ name, description, parameters, run }) => {
		try {
			modelContext.registerTool({
				name,
				description,
				inputSchema: parameters,
				execute: async (args) => {
					let result;
					try {
						result = await run(args || {});
					} catch (e) {
						result = { error: e.message };
					}
					return { content: [{ type: "text", text: JSON.stringify(result) }] };
				}
			});
		} catch (e) {
			console.warn(`WebMCP: could not register ${name}`, e);
		}
	});
}
