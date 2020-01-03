import React, {Component} from "react";
import {Button, ButtonGroup, Grid, IconButton, Menu, MenuItem} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({});

class SplitButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedKey: "",
			dropDownOpen: false,
			anchorEl: null
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClick() {
		console.log(`You clicked ${this.props.options[this.state.selectedKey]}`);
	}

	handleToggle(event) {
		event.persist();
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen,
			anchorEl: event.target
		}));
	}

	handleMenuItemClick(event, index) {
		this.setState({
			selectedKey: Object.keys(this.props.options)[index],
			dropDownOpen: false
		});
	}

	handleClose() {
		this.setState({
			dropDownOpen: false
		});
	}

	render() {
		return (
			<Grid container direction="column" alignItems="center">
				<Grid item xs={12}>
					<ButtonGroup variant="contained" color="primary">
						{
							this.state.selectedKey ?
								<Button onClick={this.handleClick}
										href={this.props.options[this.state.selectedKey]}
										target="_blank" size="small">
									{this.state.selectedKey}</Button> :
								<Button size="small">{this.props.version}</Button>
						}
						<IconButton color="primary" size="small" onClick={this.handleToggle}>
							<ArrowDropDownIcon/>
						</IconButton>
					</ButtonGroup>
					<Menu
						anchorEl={this.state.anchorEl}
						anchorOrigin={{vertical: 'top', horizontal: 'right'}}
						keepMounted
						transformOrigin={{vertical: 'top', horizontal: 'right'}}
						open={this.state.dropDownOpen}
						onClose={this.handleClose}
					>
						{Object.keys(this.props.options).map((option, index) => (
							<MenuItem
								key={option}
								selected={option === this.state.selectedKey}
								onClick={event => this.handleMenuItemClick(event, index)}
							>
								{option}
							</MenuItem>
						))}
					</Menu>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(SplitButton);
