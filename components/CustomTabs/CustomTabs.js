import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';

import styles from 'assets/jss/nextjs-material-kit/components/customTabsStyle.js';

const useStyles = makeStyles(styles);

export default function CustomTabs({ onChange, defaultKey, ...props }) {
	// edit: new props

	const [value, setValue] = React.useState(defaultKey);

	const handleChange = (event, input) => {
		// edit: toggle tab-select
		let newVal = input !== value ? input : 0;

		setValue(newVal);
		onChange(newVal); // edit: added callback
	};
	const classes = useStyles();
	const { headerColor, plainTabs, tabs, title, rtlActive } = props;
	const cardTitle = classNames({
		[classes.cardTitle]: true,
		[classes.cardTitleRTL]: rtlActive,
	});
	return (
		<Card plain={plainTabs}>
			<CardHeader color={headerColor} plain={plainTabs}>
				{title !== undefined ? (
					<div className={cardTitle}>{title}</div>
				) : null}
				<Tabs
					value={value}
					onChange={handleChange}
					classes={{
						root: classes.tabsRoot,
						indicator: classes.displayNone,
					}}
				>
					{tabs.map((prop, key) => {
						var icon = {};
						if (prop.tabIcon) {
							icon = {
								icon:
									typeof prop.tabIcon === 'string' ? (
										<Icon>{prop.tabIcon}</Icon>
									) : (
										<prop.tabIcon />
									),
							};
						}
						return prop.title ? ( // edit: use tab as title (for empty content)
							<Tab
								key={key}
								style={{ ...prop.titleStyle }}
								label={prop.tabName}
								disabled
							/>
						) : (
							<Tab
								classes={{
									root: classes.tabRootButton,
									label: classes.tabLabel,
									selected: classes.tabSelected,
									wrapper: classes.tabWrapper,
								}}
								key={key}
								label={prop.tabName}
								{...icon}
							/>
						);
					})}
				</Tabs>
			</CardHeader>
			<CardBody>
				{tabs.map((prop, key) => {
					if (prop.title) {
						return null;
					} else if (key === value) {
						return <div key={key}>{prop.tabContent}</div>;
					}
					return null;
				})}
			</CardBody>
		</Card>
	);
}

CustomTabs.propTypes = {
	headerColor: PropTypes.oneOf([
		'warning',
		'success',
		'danger',
		'info',
		'primary',
		'rose',
	]),
	title: PropTypes.string,
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			tabName: PropTypes.string.isRequired,
			tabIcon: PropTypes.object,
			tabContent: PropTypes.node.isRequired,
		})
	),
	rtlActive: PropTypes.bool,
	plainTabs: PropTypes.bool,
};
