import React, {useEffect, useState} from "react";
import ReactJson from "react-json-view";

import {Box} from "@material-ui/core";

import Form from "@rjsf/material-ui";
import datasetSchema from "../../schema/typeSchema.json";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {postSemantics as postSemanticsAction} from "../../actions/index";
import {useDispatch} from "react-redux";
import config from "../../app.config";
import Cookies from "universal-cookie";
import {browserHistory} from "react-router";

const cookies = new Cookies();

export const SemanticTypeBuilder = () => {
	const [formData, setFormData] = useState();
	const [authError, setAuthError] = useState(false);

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

	const onFormDataChanged = (formState) => {
		const typeHeaders = {
			"@context": [
				"http://www.w3.org/ns/csvw",
				{
					"@language": "en",
					"gml": "http://www.opengis.net/gml/",
					"iwfs": "http://www.ionicsoft.com/wfs/",
					"xlink": "http://www.w3.org/1999/xlink/",
					"xsd": "http://www.w3.org/2001/XMLSchema/",
					"qudt": "http://qudt.org/2.0/schema/qudt/",
					"unit": "http://qudt.org/vocab/unit/",
					"openvocab": "http://vocab.org/open/"
				}
			],
			"dc:license": {
				"@id": "http://opendefinition.org/licenses/cc-by/"
			}
		};

		const formDataWithHeaders = {...typeHeaders, ...formState.formData};
		formDataWithHeaders["url"] = formDataWithHeaders["dc:title"];

		setFormData(formDataWithHeaders);
	}

	const onFormDataSubmit = () => {
		postSemantics(formData);
	}

	if (authError) {
		browserHistory.push("/login?origin=SemanticTypeBuilder");
		return <></>;
	}
	else{
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
							<Button color="inherit" variant="contained" type="submit">
								Submit
							</Button>
						</Form>
					</Grid>
					<Grid item sm={12} md={6} lg={6} xl={6}>
						<ReactJson
							src={formData}
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
