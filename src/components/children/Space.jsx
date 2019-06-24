import * as React from "react";
import {SelectField, MenuItem} from "material-ui";

class Space extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.spaces.length > 0) {
			return (
				<SelectField floatingLabelText="Spaces"
								 hintText="Spaces"
								 value={this.props.selectedSpace}
								 onChange={this.props.handleSpaceSelection}
								 style={{maxWidth: "200px"}}>
					<MenuItem value="All" primaryText="All"/>
						{this.props.spaces.map((space, index) =>
							<MenuItem value={space.metadata.name} primaryText={space.metadata.name}/>)}
				</SelectField>);
		}
		else{
			return null;
		}

	}
}

export default Space;
