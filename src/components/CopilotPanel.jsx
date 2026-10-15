import React from "react";
import { Box, CircularProgress, Fab, IconButton, Paper, TextField, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { runAgent } from "../copilot/agent";
import { registerWebMcpTools } from "../copilot/webmcp";

const PANEL_WIDTH = 380;
const PANEL_HEIGHT = 560;
// Gap from the window edges for the default position.
const MARGIN = 24;
// How much of the panel must stay on screen, so the header can always be grabbed.
const KEEP_VISIBLE = 48;
const POSITION_KEY = "incore-copilot-position";

const useStyles = makeStyles((theme) => ({
	// A floating window over the page, so the page keeps its full width.
	panel: {
		position: "fixed",
		width: PANEL_WIDTH,
		height: PANEL_HEIGHT,
		maxWidth: `calc(100vw - ${MARGIN}px)`,
		maxHeight: `calc(100vh - ${MARGIN}px)`,
		minWidth: 280,
		minHeight: 240,
		// The browser's resize handle in the bottom-right corner.
		resize: "both",
		overflow: "hidden",
		// Above the app bar and the viewers' preview dialogs, so the chat stays usable
		// while the assistant has a map or plot open.
		zIndex: theme.zIndex.modal + 1,
		display: "flex",
		flexDirection: "column",
		border: "1px solid #dddddd",
		borderRadius: 8
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(1, 2),
		borderBottom: "1px solid #eeeeee",
		cursor: "move",
		userSelect: "none",
		// Pointer moves drag the panel instead of scrolling the page on touch screens.
		touchAction: "none"
	},
	messages: {
		flex: 1,
		overflowY: "auto",
		padding: theme.spacing(2)
	},
	message: {
		padding: theme.spacing(1, 1.5),
		marginBottom: theme.spacing(1),
		borderRadius: 8,
		whiteSpace: "pre-wrap",
		wordBreak: "break-word"
	},
	user: {
		background: "#1B2D45",
		color: "#ffffff",
		marginLeft: theme.spacing(4)
	},
	assistant: {
		background: "#eeeeee",
		marginRight: theme.spacing(4)
	},
	// Assistant replies are markdown; keep its elements compact inside the bubble.
	markdown: {
		"whiteSpace": "normal",
		"& > :first-child": { marginTop: 0 },
		"& > :last-child": { marginBottom: 0 },
		"& p": { margin: theme.spacing(0, 0, 1) },
		"& ul, & ol": { margin: theme.spacing(0, 0, 1), paddingLeft: theme.spacing(2.5) },
		"& li": { marginBottom: 2 },
		"& li > p": { margin: 0 },
		"& h1, & h2, & h3, & h4, & h5, & h6": {
			fontSize: "14px",
			fontWeight: 600,
			margin: theme.spacing(1.5, 0, 0.5)
		},
		"& code": {
			fontFamily: "monospace",
			fontSize: "12px",
			background: "#dddddd",
			padding: "0 3px",
			borderRadius: 3
		},
		"& pre": {
			background: "#dddddd",
			padding: theme.spacing(1),
			borderRadius: 4,
			overflowX: "auto",
			margin: theme.spacing(0, 0, 1)
		},
		"& pre code": { background: "none", padding: 0 },
		"& blockquote": {
			margin: theme.spacing(0, 0, 1),
			paddingLeft: theme.spacing(1),
			borderLeft: "3px solid #bbbbbb",
			color: "#555555"
		},
		"& a": { color: theme.palette.primary.main },
		"& hr": { border: 0, borderTop: "1px solid #cccccc" }
	},
	// Wide tables scroll inside the bubble instead of stretching the panel.
	tableWrap: {
		"overflowX": "auto",
		"margin": theme.spacing(0, 0, 1),
		"& table": { borderCollapse: "collapse", fontSize: "12px" },
		"& th, & td": {
			border: "1px solid #cccccc",
			padding: "2px 6px",
			textAlign: "left",
			verticalAlign: "top"
		},
		"& th": { background: "#dddddd" },
		// Words wrap only at spaces, so ids and type names stay whole; the table
		// scrolls sideways if that makes it too wide.
		"& th, & td, & td code": { wordBreak: "normal", overflowWrap: "normal" }
	},
	step: {
		color: "#8998AB",
		fontFamily: "monospace",
		fontSize: "11px",
		marginBottom: theme.spacing(1)
	},
	input: {
		display: "flex",
		alignItems: "flex-end",
		padding: theme.spacing(1, 2),
		borderTop: "1px solid #eeeeee"
	},
	fab: {
		position: "fixed",
		right: theme.spacing(3),
		bottom: theme.spacing(3),
		zIndex: 1200
	}
}));

// Model output is untrusted: react-markdown never renders raw HTML, and links to other
// sites open in a new tab so following one never replaces the app.
const isExternal = (href) => /^https?:\/\//i.test(href || "");

// react-markdown passes its syntax-tree node to custom components; keep it off the DOM.
const domProps = (props) => {
	const rest = { ...props };
	delete rest.node;
	return rest;
};

// Keeps a panel of the given width reachable inside the window.
const clamp = ({ x, y }, width) => ({
	x: Math.min(Math.max(x, KEEP_VISIBLE - width), window.innerWidth - KEEP_VISIBLE),
	y: Math.min(Math.max(y, 0), window.innerHeight - KEEP_VISIBLE)
});

const defaultPosition = () => ({
	x: window.innerWidth - PANEL_WIDTH - MARGIN,
	y: Math.max(window.innerHeight - PANEL_HEIGHT - MARGIN, 0)
});

// The last place the user dragged the panel to, in this browser.
const savedPosition = () => {
	try {
		const saved = JSON.parse(window.localStorage.getItem(POSITION_KEY));
		return saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) ? saved : null;
	} catch (e) {
		return null;
	}
};

const savePosition = (position) => {
	try {
		window.localStorage.setItem(POSITION_KEY, JSON.stringify(position));
	} catch (e) {
		// Storage can be unavailable (private windows, blocked site data); not worth surfacing.
	}
};

// Floating chat window over the app, dragged by its header and resized from its corner.
// The assistant drives the viewers through the copilot tools; each tool call shows up as
// a step line in the chat.
const CopilotPanel = ({ children }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const panel = React.useRef(null);
	const [position, setPosition] = React.useState(() => clamp(savedPosition() || defaultPosition(), PANEL_WIDTH));
	const drag = React.useRef(null);
	// What the user sees: {kind: "user" | "assistant" | "step" | "error", text}
	const [entries, setEntries] = React.useState([]);
	// What the model sees: the full message history including tool calls and results.
	const history = React.useRef([]);
	const [input, setInput] = React.useState("");
	const [busy, setBusy] = React.useState(false);
	const bottom = React.useRef(null);

	const markdownComponents = React.useMemo(
		() => ({
			table: (props) => (
				<div className={classes.tableWrap}>
					<table {...domProps(props)} />
				</div>
			),
			a: (props) =>
				isExternal(props.href) ? (
					<a {...domProps(props)} target="_blank" rel="noopener noreferrer" />
				) : (
					<a {...domProps(props)} />
				)
		}),
		[classes.tableWrap]
	);

	React.useEffect(registerWebMcpTools, []);

	const width = () => (panel.current ? panel.current.offsetWidth : PANEL_WIDTH);

	// Pull the panel back into view if the window shrinks around it.
	React.useEffect(() => {
		const onResize = () => setPosition((current) => clamp(current, width()));
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	const startDrag = (e) => {
		// Leave the close button clickable.
		if (e.button !== 0 || e.target.closest("button")) {
			return;
		}
		e.currentTarget.setPointerCapture(e.pointerId);
		drag.current = { dx: e.clientX - position.x, dy: e.clientY - position.y };
	};

	const moveDrag = (e) => {
		if (drag.current) {
			setPosition(clamp({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy }, width()));
		}
	};

	const endDrag = () => {
		if (drag.current) {
			drag.current = null;
			setPosition((current) => {
				savePosition(current);
				return current;
			});
		}
	};

	React.useEffect(() => {
		if (bottom.current) {
			bottom.current.scrollIntoView({ block: "end" });
		}
	}, [entries, busy]);

	const add = (entry) => setEntries((current) => [...current, entry]);

	const send = async () => {
		const text = input.trim();
		if (!text || busy) {
			return;
		}
		setInput("");
		add({ kind: "user", text });
		setBusy(true);
		try {
			const messages = await runAgent([...history.current, { role: "user", content: text }], (name, args) =>
				add({ kind: "step", text: `→ ${name} ${args && args !== "{}" ? args : ""}` })
			);
			history.current = messages;
			add({ kind: "assistant", text: messages[messages.length - 1].content || "(no answer)" });
		} catch (e) {
			add({ kind: "error", text: e.message });
		} finally {
			setBusy(false);
		}
	};

	return (
		<div>
			{children}
			{open ? (
				<Paper
					ref={panel}
					className={classes.panel}
					elevation={8}
					style={{ left: position.x, top: position.y }}
				>
					<Box
						className={classes.header}
						onPointerDown={startDrag}
						onPointerMove={moveDrag}
						onPointerUp={endDrag}
						onPointerCancel={endDrag}
					>
						<Typography variant="h6">IN-CORE Assistant</Typography>
						<IconButton size="small" onClick={() => setOpen(false)} aria-label="Close assistant">
							<CloseIcon fontSize="small" />
						</IconButton>
					</Box>
					<Box className={classes.messages}>
						{entries.length === 0 ? (
							<Typography color="textSecondary">
								Ask me to find hazards or datasets, e.g. &ldquo;Show earthquakes near Memphis and open
								the first one&rdquo;.
							</Typography>
						) : null}
						{entries.map((entry, i) =>
							entry.kind === "step" ? (
								<div key={i} className={classes.step}>
									{entry.text}
								</div>
							) : entry.kind === "assistant" ? (
								<Typography
									key={i}
									component="div"
									className={`${classes.message} ${classes.assistant} ${classes.markdown}`}
								>
									<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
										{entry.text}
									</ReactMarkdown>
								</Typography>
							) : (
								<Typography
									key={i}
									className={`${classes.message} ${
										entry.kind === "user" ? classes.user : classes.assistant
									}`}
									color={entry.kind === "error" ? "error" : "inherit"}
								>
									{entry.text}
								</Typography>
							)
						)}
						{busy ? <CircularProgress size={20} /> : null}
						<div ref={bottom} />
					</Box>
					<Box className={classes.input}>
						<TextField
							fullWidth
							multiline
							rowsMax={4}
							placeholder="Ask the assistant…"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									send();
								}
							}}
							inputProps={{ "aria-label": "Message the assistant" }}
						/>
						<IconButton onClick={send} disabled={busy || !input.trim()} aria-label="Send">
							<SendIcon />
						</IconButton>
					</Box>
				</Paper>
			) : (
				<Tooltip title="IN-CORE Assistant">
					<Fab
						color="primary"
						className={classes.fab}
						onClick={() => setOpen(true)}
						aria-label="Open assistant"
					>
						<ChatIcon />
					</Fab>
				</Tooltip>
			)}
		</div>
	);
};

export default CopilotPanel;
