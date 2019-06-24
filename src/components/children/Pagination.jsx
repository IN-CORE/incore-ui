import * as React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/fontawesome-free-solid";

class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{paddingTop: "5x", textAlign: "center"}} >
				<button disabled={this.props.pageNumber === 1} onClick={this.props.previous}>
					<FontAwesomeIcon icon={faChevronLeft} transform="grow-4"/> Prev
				</button>
				<button disabled={true}>{this.props.pageNumber}</button>
				<button disabled={this.props.data.length < this.props.dataPerPage}
						onClick={this.props.next}>
					Next <FontAwesomeIcon icon={faChevronRight} transform="grow-4"/></button>
			</div>
		);
	}
}

export default Pagination;
