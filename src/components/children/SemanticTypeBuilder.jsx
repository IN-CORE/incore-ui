import React, {useEffect, useState} from "react";
import ReactJson from "react-json-view";

import {Box, InputLabel, MenuItem, Select} from "@material-ui/core";

import Form from "@rjsf/material-ui";
import datasetSchema from "../../schema/typeSchema.json";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {postSemantics as postSemanticsAction} from "../../actions/index";
import {useDispatch} from "react-redux";
import config from "../../app.config";
import Cookies from "universal-cookie";
import {browserHistory} from "react-router";
import {exportJson, exportString} from "../../utils/common";
import * as jsonld from "jsonld";

const cookies = new Cookies();

export const SemanticTypeBuilder = () => {
	const [formData, setFormData] = useState();
	const [authError, setAuthError] = useState();
	const [display, setDisplay] = useState();
	const [mode, setMode] = useState("compact")

	// redux
	const dispatch = useDispatch();
	const postSemantics = (formData) => dispatch(postSemanticsAction(formData))

	useEffect(() => {
		// check if logged in
		let authorization = cookies.get("Authorization");

		//logged in
		if (
			config.hostname.includes("localhost") ||
			(authorization !== undefined && authorization !== "" && authorization !== null)
		) {
			setAuthError(false);
		} else {
			setAuthError(true);
		}
	}, []);

	useEffect(() => {
		const processData = async () => {
			try {
				if (mode === "expand") {
					const expanded = await jsonld.expand(formData);
					setDisplay(expanded);
				} else if (mode === "flatten") {
					const flattened = await jsonld.flatten(formData);
					setDisplay(flattened);
				} else {
					setDisplay(formData);
				}
			} catch (error) {
				// Handle any errors that occur during JSON-LD processing
				console.error("JSON-LD processing error:", error);
			}
		};

		processData();

	}, [mode, formData]);

	const context = {
		"@language": "en",
		"dc": "http://purl.org/dc/terms/",
		"gml": "https://schemas.opengis.net/gml/",
		"wfs": "http://schemas.opengis.net/wfs/1.1.0/wfs.xsd",
		"xlink": "http://www.w3.org/1999/xlink/",
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"qudt": "http://qudt.org/schema/qudt/",
		"unit": "http://qudt.org/vocab/unit/",
		"openvocab": "http://vocab.org/open/",
		"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
		"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
		"dcat": "http://www.w3.org/ns/dcat#",
		"prov": "http://www.w3.org/ns/prov#"
	}

	const onFormDataChanged = async (formState) => {
		const typeHeaders = {
			"@context": [
				"http://www.w3.org/ns/csvw#",
				context
			],
			"dc:license": {
				"@id": "http://opendefinition.org/licenses/cc-by/"
			}
		};
		formState.formData["url"] = formState.formData["dc:title"];
		const formDataWithHeaders = {...typeHeaders, ...formState.formData};
		setFormData(formDataWithHeaders);
	}

	const onFormDataSubmit = () => {
		postSemantics(formData);
	}

	const onCanonizedDownload = async () => {
		const canonized = await jsonld.canonize(formData, {
			algorithm: 'URDNA2015',
			format: 'application/n-quads'
		});
		exportString(canonized, `${formData["dc:title"]}-canonized`);
	}

	const onRDFDownload = async () => {
		const nquads = await jsonld.toRDF(formData, {format: 'application/n-quads'});
		exportString(nquads, `${formData["dc:title"]}-nquads`);
	}

	if (authError) {
		browserHistory.push("/login?origin=SemanticTypeBuilder");
		return <></>;
	} else {
		return (
			<Box style={{display: "block", margin: "5em"}}>
				<Grid container spacing={3}>
					<Grid item sm={12} md={6} lg={6} xl={6}>
						<Form
							formData={formData}
							schema={datasetSchema["schema"]}
							uiSchema={datasetSchema["uiSchema"]}
							onSubmit={onFormDataSubmit}
							onChange={onFormDataChanged}
						>
							<Box>
								<Button color="primary"
										variant="contained"
										style={{ marginLeft: "0.5em" }}
										onClick={() => {
									exportJson(formData, formData["dc:title"]);
								}}>
									Download
								</Button>
								<Button color="primary"
										variant="contained"
										style={{ marginLeft: "0.5em" }}
										onClick={onCanonizedDownload}>
									Download Canonized
								</Button>
								<Button color="primary"
										variant="contained"
										style={{ marginLeft: "0.5em" }}
										onClick={onRDFDownload}>
									Download RDF
								</Button>
								<Button color="secondary"
										variant="contained"
										style={{ marginLeft: "0.5em" }}
										type="submit">
									Submit
								</Button>
							</Box>
						</Form>
					</Grid>
					<Grid item sm={12} md={6} lg={6} xl={6}>
						<Box style={{width:"100%", padding: "1.5em 0"}}>
							<InputLabel>Mode</InputLabel>
							<Select value={mode}
									onChange={(event)=>{setMode(event.target.value);}}>
								<MenuItem key="compact" value="compact">Compact</MenuItem>
								<MenuItem key="expand" value="expand">Expand</MenuItem>
								<MenuItem key="flatten" value="flatten">Flatten</MenuItem>
							</Select>
						</Box>
						<ReactJson
							src={display}
							theme="summerfruit:inverted"
							displayObjectSize={false}
							displayDataTypes={false}
							name={false}
						/>
					</Grid>
				</Grid>
			</Box>
		);
	}
};
