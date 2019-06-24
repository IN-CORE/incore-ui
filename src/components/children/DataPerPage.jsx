import * as React from "react";
import {MenuItem, SelectField} from "material-ui";

class DataPerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SelectField floatingLabelText="Results per page"
						 value={this.props.dataPerPage}
						 onChange={this.props.changeDataPerPage}
						 style={{maxWidth: "200px"}}
			>
				<MenuItem primaryText="15" value={15}/>
				<MenuItem primaryText="30" value={30}/>
				<MenuItem primaryText="50" value={50}/>
				<MenuItem primaryText="75" value={75}/>
				<MenuItem primaryText="100" value={100}/>
			</SelectField>);
	}
}

export default DataPerPage;

