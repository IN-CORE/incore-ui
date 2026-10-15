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

const useStyles = makeStyles((theme) => ({
	// Leaves room for the panel, which is fixed to the window edge.
	contentWithPanel: {
		marginRight: PANEL_WIDTH
	},
	panel: {
		width: PANEL_WIDTH,
		position: "fixed",
		top: 0,
		bottom: 0,
		right: 0,
		// Above the app bar and the viewers' preview dialogs, so the chat stays usable
		// while the assistant has a map or plot open.
		zIndex: theme.zIndex.modal + 1,
		display: "flex",
		flexDirection: "column",
		borderLeft: "1px solid #dddddd",
		borderRadius: 0
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(1, 2),
		borderBottom: "1px solid #eeeeee"
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

// Chat panel docked to the right of the app. The assistant drives the viewers on the left
// through the copilot tools; each tool call shows up as a step line in the chat.
const CopilotPanel = ({ children }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
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
			<div className={open ? classes.contentWithPanel : undefined}>{children}</div>
			{open ? (
				<Paper className={classes.panel} elevation={0}>
					<Box className={classes.header}>
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
