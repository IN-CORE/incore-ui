import React, {Component, useState, useRef} from "react";
import { Grid, Button, ButtonGroup, IconButton, Menu, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";


class SplitButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: 0,
			dropDownOpen: false,
			anchorEl: null
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClick() {
		console.log(`You clicked ${this.props.options[this.state.selectedIndex]}`);
	}

	handleToggle(event) {
		event.persist();
		this.setState( prevState => ({
			dropDownOpen: !prevState.dropDownOpen,
			anchorEl: event.target
		}));
	}

	handleMenuItemClick(event, index){
		this.setState({
			selectedIndex: index,
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
						<Button onClick={this.handleClick}>{this.props.options[this.state.selectedIndex]}</Button>
						<IconButton value={this.props.name} color="primary" onClick={this.handleToggle}>
							<ArrowDropDownIcon />
						</IconButton>
					</ButtonGroup>
					<Menu
						anchorEl = {this.state.anchorEl}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						keepMounted
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						open={this.state.dropDownOpen}
						onClose={this.handleClose}
					>
						{this.props.options.map((option, index) => (
							<MenuItem
								key={option}
								disabled={index === 0}
								selected={index === this.state.selectedIndex}
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

export default SplitButton;
