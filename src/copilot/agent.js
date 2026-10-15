// The agent loop: send the conversation to the model, run any tools it asks for, send
// the results back, and repeat until it answers in text. Tools are the page tools,
// which drive the viewers, plus incore-mcp's read-only tools, which query IN-CORE.

import config from "../app.config";
import { getHeader } from "../actions";
import { getServerTools } from "./mcp";
import { tools as pageTools } from "./tools";

const MAX_STEPS = 8;

const SYSTEM_PROMPT = `You are the assistant inside the IN-CORE web app, a platform for modeling the impact
of natural hazards (earthquakes, tornadoes, hurricanes, tsunamis, floods) on communities.
The user sees the app next to this chat. Use your tools to drive the app for them: they
change what is on screen, so prefer showing things in the viewers over describing them.
The viewers are: hazard viewer (hazards), data viewer (datasets), DFR3 viewer (fragility,
restoration and repair curves and mappings), semantic viewer (data type schemas) and the
profile page (usage). Call get_current_view when the user refers to "this" or what they
are looking at. You cannot delete anything; tell the user to use the viewer's Delete button.
Your other tools (search_*, get_*, list_*, plot_fragility_curves, and the docs tools
search_docs, get_doc, search_api, get_api) query IN-CORE and its documentation directly
without changing the screen: use them to look things up, and the viewer tools to show
results to the user.
Facts about the user's data must come from tool results. For general questions about
IN-CORE, hazards or resilience you may answer from your own knowledge, and say so.
Answer briefly and mention item names and ids.`;

// Page tools first, so they win if incore-mcp ever offers a tool with the same name.
async function allTools() {
	const names = new Set(pageTools.map((tool) => tool.name));
	const serverTools = (await getServerTools()).filter((tool) => !names.has(tool.name));
	return [...pageTools, ...serverTools];
}

function schemas(tools) {
	return tools.map(({ name, description, parameters }) => ({
		type: "function",
		function: { name, description, parameters }
	}));
}

async function complete(messages, tools) {
	const headers = new Headers(getHeader());
	headers.set("Content-Type", "application/json");
	// incore-mcp's chat relay adds the LLM gateway key, which never reaches the browser.
	const response = await fetch(config.copilotChatUrl, {
		method: "POST",
		headers,
		body: JSON.stringify({ messages, tools: schemas(tools) })
	});
	const body = await response.json().catch(() => ({}));
	if (response.status === 401) {
		throw new Error(
			"The assistant could not verify your sign-in. Sign in again, or ask an admin for assistant access."
		);
	}
	if (!response.ok) {
		throw new Error(body.error?.message || body.error || `Assistant request failed (${response.status}).`);
	}
	return body.choices[0].message;
}

async function runTool(call, tools) {
	const tool = tools.find((candidate) => candidate.name === call.function.name);
	if (!tool) {
		return { error: `Unknown tool ${call.function.name}.` };
	}
	try {
		const args = call.function.arguments ? JSON.parse(call.function.arguments) : {};
		return await tool.run(args);
	} catch (e) {
		// Returned to the model rather than thrown, so it can recover or explain.
		return { error: e.message };
	}
}

// history: prior {role, content} turns. onStep is called with each tool call as it runs,
// so the panel can show what the assistant is doing. Returns the new messages to keep.
export async function runAgent(history, onStep) {
	const messages = [{ role: "system", content: SYSTEM_PROMPT }, ...history];
	const tools = await allTools();
	for (let step = 0; step < MAX_STEPS; step++) {
		const reply = await complete(messages, tools);
		const calls = reply.tool_calls || [];
		messages.push({
			role: "assistant",
			content: reply.content || "",
			...(calls.length ? { tool_calls: calls } : {})
		});
		if (!calls.length) {
			return messages.slice(1);
		}
		for (const call of calls) {
			onStep(call.function.name, call.function.arguments);
			const result = await runTool(call, tools);
			const content = typeof result === "string" ? result : JSON.stringify(result);
			messages.push({ role: "tool", tool_call_id: call.id, content });
		}
	}
	messages.push({ role: "assistant", content: "I stopped after too many steps. Try a narrower request." });
	return messages.slice(1);
}
