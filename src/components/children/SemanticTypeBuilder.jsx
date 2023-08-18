import React, {useState} from "react";

import {Box, Button, TextField} from "@material-ui/core";

import Form from "@rjsf/material-ui";
import datasetSchema from "../../schema/typeSchema.json";

export const SemanticTypeBuilder = (
) => {
	const [type, setType] = useState("");

	const onSave = (formData) =>{
		setType(formData);
	}

	return (
		<Box style={{display:"block", margin:"5em auto", maxWidth:"60%"}}>
			<Form
				schema={datasetSchema["schema"]}
				uiSchema={datasetSchema["uiSchema"]}
				onSubmit={({ formData }) => {
					onSave(formData);
				}}
			>
				<Box>
					<Button variant="contained" type="submit">
						Submit
					</Button>
				</Box>
			</Form>
			<TextField>
				{type}
			</TextField>
		</Box>
	);
};
