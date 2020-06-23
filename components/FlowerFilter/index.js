import { useState } from 'react';
import { withAppState } from '../../state';
import { seasons, sun } from '../../constants/filterConfig';
import {
	FormControl,
	FormGroup,
	FormLabel,
	FormControlLabel,
	FormHelperText,
	Checkbox,
	Switch,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';

const formStyles = {
	formRoot: {
		display: 'flex',
	},
	formControl: {
		/* margin: theme.spacing(3), */
		width: '100%',
	},
	_formGroup: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	_groupItem: {
		width: '150px',
	},
	_checkbox: {
		maxWidth: '50%',
	},
};

const tabStyles = {
	tabContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	textCenter: {
		textAlign: 'center',
		background: 'orange',
	},
};

const styles = {
	...tabStyles,
	...formStyles,
};

const useStyles = makeStyles(styles);

const filterTabs = ({ classes, filter, setFilter }) => [
	{
		tabName: 'Season',
		tabContent: (
			<div className={classes.formRoot}>
				<FormControl component='fieldset' className={classes.formControl}>
					<FormLabel component='legend'>Pick blooming season(s)</FormLabel>
					<FormGroup className={classes._formGroup}>
						{seasons.map((season) => (
							<FormControlLabel
								className={classes._groupItem}
								key={season}
								control={
									<Checkbox
										className={classes._checkbox}
										checked={filter[season]}
										onChange={(e) =>
											setFilter({
												type: 'season',
												key: season,
												val: e.target.checked,
											})
										}
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
									/>
								}
								label={season}
							/>
						))}
					</FormGroup>
					<FormHelperText>Choose blooming seasons</FormHelperText>
				</FormControl>
			</div>
		),
	},
	{
		tabName: 'Sunlight',
		tabContent: (
			<div className={classes.formRoot}>
				<FormControl component='fieldset' className={classes.formControl}>
					<FormLabel component='legend'>Flower likes</FormLabel>
					<FormGroup className={classes._formGroup}>
						{sun.map((opt) => (
							<FormControlLabel
								className={classes._groupItem}
								key={opt}
								control={
									<Checkbox
										className={classes._checkbox}
										checked={filter[opt]}
										onChange={(e) =>
											setFilter({
												type: 'sun',
												key: opt,
												val: e.target.checked,
											})
										}
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
									/>
								}
								label={opt ? 'sun' : 'darkness'}
							/>
						))}
					</FormGroup>
					<FormHelperText>Choose blooming seasons</FormHelperText>
				</FormControl>
			</div>
		),
	},
];

const FlowerFilter = ({ appState, appSetters }) => {
	const { filter } = appState;
	const { setFilter } = appSetters;

	const classes = useStyles();

	console.log('seasons', seasons);

	return (
		<CustomTabs
			className={classes._tabContainer}
			headerColor='success'
			tabs={filterTabs({ classes, filter, setFilter })}
		/>
	);
};

export default withAppState(FlowerFilter);
