import React, {Component, useState, useRef} from "react";
import { Grid, Button, ButtonGroup, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";


class SplitButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dropDownOpen: false,
			anchorEl: null
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClick() {
		console.info(`You clicked ${options[selectedIndex]}`);
	}

	handleToggle(event) {
		this.setState( prevState => ({
			dropDownOpen: !prevState.dropDownOpen,
			anchorEl: event.currentTarget
		}));
		console.log(this.state);
	}

	handleMenuItemClick(event, index){
		setSelectedIndex(index);
		setOpen(false);
	}

	handleClose(event) {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	}

	render() {
		const selectedIndex = 0;

		return (
			<Grid container direction="column" alignItems="center">
				<Grid item xs={12}>
					<ButtonGroup variant="contained" color="primary" ref={this.state.anchorEl} aria-label="split button">
						<Button onClick={this.handleClick}>{this.props.options[selectedIndex]}</Button>
						<Button
							color="primary"
							size="small"
							aria-controls={this.state.dropDownOpen ? "split-button-menu" : undefined}
							aria-expanded={this.state.dropDownOpen ? "true" : undefined}
							aria-haspopup="menu"
							onClick={this.handleToggle}
						>
							<ArrowDropDownIcon />
						</Button>
					</ButtonGroup>
					<Popper open={this.state.dropDownOpen} anchorEl={this.state.anchorEl} role={undefined} transition disablePortal>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin: placement === "bottom" ? "center top" : "center bottom",
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={this.handleClose}>
										<MenuList id="split-button-menu">
											{this.props.options.map((option, index) => (
												<MenuItem
													key={option}
													disabled={index === 2}
													selected={index === selectedIndex}
													onClick={event => this.handleMenuItemClick(event, index)}
												>
													{option}
												</MenuItem>
											))}
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
				</Grid>
			</Grid>
		);
	}
}

export default SplitButton;
