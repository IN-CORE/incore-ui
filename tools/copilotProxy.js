// Dev-only relay from the copilot chat panel to the LLM gateway (NCSA Lumen by default).
//
// The gateway key must never reach the browser, and Lumen sends no CORS headers, so the
// browser posts the conversation here and this forwards it with the key attached. The
// agent loop and all tools run in the browser; this only adds the key and the model.
//
// Proof of concept: in a deployment this belongs in a real backend (e.g. incore-mcp)
// that verifies the caller's Keycloak token, rate-limits per user and tags requests
// with the user id. Here it only checks that the caller sent some Authorization header.

const BASE_URL = (process.env.LUMEN_BASE_URL || "https://lumen.ncsa.illinois.edu/v1").replace(/\/$/, "");
const API_KEY = process.env.LUMEN_API_KEY || "";
const MODEL = process.env.LUMEN_MODEL || "gemma-4-31b-it";
const MAX_BODY_BYTES = 1000000;

function send(res, status, body) {
	res.statusCode = status;
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(body));
}

function readBody(req) {
	return new Promise((resolve, reject) => {
		let size = 0;
		const chunks = [];
		req.on("data", (chunk) => {
			size += chunk.length;
			if (size > MAX_BODY_BYTES) {
				reject(new Error("Request too large"));
				req.destroy();
			} else {
				chunks.push(chunk);
			}
		});
		req.on("end", () => resolve(Buffer.concat(chunks).toString()));
		req.on("error", reject);
	});
}

export default async function copilotProxy(req, res, next) {
	if (req.url !== "/copilot/chat") {
		return next();
	}
	if (req.method !== "POST") {
		return send(res, 405, { error: "POST only" });
	}
	if (!API_KEY) {
		return send(res, 503, { error: "LUMEN_API_KEY is not set on the dev server." });
	}
	if (!req.headers.authorization && !req.headers["x-auth-userinfo"]) {
		return send(res, 401, { error: "Sign in to use the assistant." });
	}

	let payload;
	try {
		payload = JSON.parse(await readBody(req));
	} catch (e) {
		return send(res, 400, { error: `Bad request: ${e.message}` });
	}

	try {
		const upstream = await fetch(`${BASE_URL}/chat/completions`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
			body: JSON.stringify({
				model: MODEL,
				messages: payload.messages,
				tools: payload.tools,
				max_tokens: 1500,
				temperature: 0,
				// Understood by the vLLM-style backends Lumen proxies; others ignore it.
				chat_template_kwargs: { enable_thinking: false }
			})
		});
		const text = await upstream.text();
		res.statusCode = upstream.status;
		res.setHeader("Content-Type", "application/json");
		res.end(text);
	} catch (e) {
		send(res, 502, { error: `Gateway request failed: ${e.message}` });
	}
}
