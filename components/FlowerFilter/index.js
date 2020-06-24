import { useState } from 'react';
import { withAppState } from '../../state';
import { seasons, sun } from '../../constants/filterConfig';
import {
	FormControl,
	FormGroup,
	FormLabel,
	FormControlLabel,
	FormHelperText,
	Paper,
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
		margin: 'none',
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

const FlowerFilter = ({ appState, appSetters }) => {
	const { filter, displayedFilterKey } = appState;
	const { setFilter, setDisplayedFilterKey } = appSetters;

	const classes = useStyles();

	console.log('seasons', filter.season);

	const defaultFilterKey = 0;

	return (
		<CustomTabs
			className={['tab-container', classes._tabContainer].join(' ')}
			headerColor='warning'
			tabs={[
				{
					tabName: 'Filter',
					tabContent: '',
					title: true,
					titleStyle: {},
				},
				{
					tabName: 'Season',
					tabContent: (
						<div className={classes.formRoot}>
							<FormControl
								component='fieldset'
								className={classes.formControl}
							>
								<FormLabel component='legend'>
									Pick blooming season(s)
								</FormLabel>
								<FormGroup className={classes._formGroup}>
									{seasons.map((season) => {
										return (
											<FormControlLabel
												className={classes._groupItem}
												key={season}
												control={
													<Checkbox
														type='checkbox'
														className={classes._checkbox}
														checked={filter.season[season]}
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
										);
									})}
								</FormGroup>
								<Button onClick={() => setFilter({ reset: true })}>
									Reset all filters
								</Button>
							</FormControl>
						</div>
					),
				},
				{
					tabName: 'Sunlight',
					tabContent: (
						<div className={classes.formRoot}>
							<FormControl
								component='fieldset'
								className={classes.formControl}
							>
								<FormLabel component='legend'>Flower likes</FormLabel>
								<FormGroup className={classes._formGroup}>
									{sun.map((opt) => (
										<FormControlLabel
											className={classes._groupItem}
											key={opt}
											control={
												<Checkbox
													className={classes._checkbox}
													checked={filter.sun[opt]}
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
								<Button onClick={() => setFilter({ reset: true })}>
									Reset all filters
								</Button>
							</FormControl>
						</div>
					),
				},
			]}
			plainTabs={true}
			defaultKey={defaultFilterKey}
			activeKey={displayedFilterKey}
			onChange={(activeKey) => {
				setDisplayedFilterKey({ displayedFilterKey: activeKey });
			}}
		/>
	);
};

export default withAppState(FlowerFilter);
