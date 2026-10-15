// Server-side tools from incore-mcp, called straight from the browser with the user's
// own Keycloak token, so they see exactly what the user could see in the viewers.
//
// incore-mcp runs stateless with JSON responses, so each call is one plain JSON-RPC
// POST: no session, no event stream, no SDK needed. Only tools incore-mcp marks
// read-only are offered; anything that creates, changes or deletes is left out.

import config from "../app.config";
import { getHeader } from "../actions";

const PROTOCOL_VERSION = "2025-06-18";
// Read-only tools left out to keep the model's tool list short: workflow internals,
// projects, and downloads, whose file contents would travel through the model.
const EXCLUDED = [/datawolf/, /project/, /^download_/, /_file$/];
// Tool results go back to the model on every turn; cap them.
const MAX_RESULT_CHARS = 12000;

let requestId = 0;

async function rpc(method, params) {
	const headers = new Headers({
		"Accept": "application/json, text/event-stream",
		"Content-Type": "application/json",
		"MCP-Protocol-Version": PROTOCOL_VERSION
	});
	const authorization = getHeader().get("Authorization");
	if (authorization) {
		headers.set("Authorization", authorization);
	}
	const response = await fetch(config.copilotMcpUrl, {
		method: "POST",
		headers,
		body: JSON.stringify({ jsonrpc: "2.0", id: ++requestId, method, params })
	});
	if (!response.ok) {
		throw new Error(`incore-mcp ${method} failed (${response.status}).`);
	}
	const body = await response.json();
	if (body.error) {
		throw new Error(`incore-mcp ${method}: ${body.error.message}`);
	}
	return body.result;
}

async function callTool(name, args) {
	const result = await rpc("tools/call", { name, arguments: args });
	const text = (result.content || [])
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("\n");
	const clipped = text.length > MAX_RESULT_CHARS ? `${text.slice(0, MAX_RESULT_CHARS)}… (truncated)` : text;
	return result.isError ? { error: clipped } : clipped;
}

async function listTools() {
	const tools = [];
	let cursor;
	do {
		const page = await rpc("tools/list", cursor ? { cursor } : {});
		tools.push(...page.tools);
		cursor = page.nextCursor;
	} while (cursor);
	return tools
		.filter((tool) => tool.annotations && tool.annotations.readOnlyHint === true)
		.filter((tool) => !EXCLUDED.some((pattern) => pattern.test(tool.name)))
		.map((tool) => ({
			name: tool.name,
			description: tool.description || tool.title || tool.name,
			parameters: tool.inputSchema || { type: "object", properties: {} },
			run: (args) => callTool(tool.name, args)
		}));
}

let cached = null;

// The read-only incore-mcp tools, fetched once per page load. Resolves to [] when
// incore-mcp is unreachable, so the page tools keep working without it.
export function getServerTools() {
	if (!config.copilotMcpUrl) {
		return Promise.resolve([]);
	}
	if (!cached) {
		cached = listTools().catch((e) => {
			console.warn("Copilot: incore-mcp tools unavailable", e);
			cached = null;
			return [];
		});
	}
	return cached;
}
