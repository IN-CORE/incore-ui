import * as React from "react";
import {Button, ButtonGroup} from "@material-ui/core";
import PreviousIcon from "@material-ui/icons/ChevronLeft";
import NextIcon from "@material-ui/icons/ChevronRight";


class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{textAlign: "center"}}>
				<ButtonGroup color="primary" size="small">
					<Button disabled={this.props.pageNumber === 1}
							onClick={this.props.previous}>
						<PreviousIcon fontSize="small"/></Button>
					<Button disabled={true}>{this.props.pageNumber}</Button>
					<Button disabled={this.props.data.length < this.props.dataPerPage} onClick={this.props.next}>
						<NextIcon fontSize="small"/></Button>
				</ButtonGroup>
			</div>
		);
	}
}

export default Pagination;
