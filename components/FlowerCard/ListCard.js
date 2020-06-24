// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';

import imagesStyles from 'assets/jss/nextjs-material-kit/imagesStyles.js';

import { cardTitle } from 'assets/jss/nextjs-material-kit.js';

import LocalFlorist from '@material-ui/icons/LocalFlorist';

import beeCursor from 'public/bee_icon.png';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const customStyle = {
	_card: {
		width: '100%',
		maxWidth: '20rem',
		margin: '5px',
	},
	_imgFallback: {
		width: '320px',
		height: '233px',
		opacity: '.1',
		background: 'green',
		cursor: `url(${beeCursor}), auto`,
	},
	_noMargin: {
		margin: '0',
		maxWidth: 'unset',
	},
	_maxHeight: { maxHeight: '220px' },
	_fullWidth: {
		width: '100%',
		maxWidth: 'unset',
		height: 'auto',
		margin: '0',
	},
	_noRadius: {
		borderRadius: '0',
	},
	_autoHeight: {
		height: 'auto',
		maxHeight: 'unset',
		minHeight: 'unset',
	},
};

const styles = {
	...imagesStyles,
	_img: {
		...imagesStyles.imgCardTop,
		cursor: `url(${beeCursor}), auto`,
	},

	cardTitle,
	...customStyle,
};

const useStyles = makeStyles(styles);

const ListCard = ({ flower }) => {
	const classes = useStyles();

	const medium = useMediaQuery('(max-width:679px)');
	const small = useMediaQuery('(max-width:480px)');

	const { cover_image: img, common_name: name } = flower;

	return (
		<>
			<Card
				className={[
					classes._card,
					medium ? classes._noMargin : null,
					small ? classes._fullWidth : null,
				].join(' ')}
			>
				{img !== '' ? (
					<img
						className={[
							classes._img,
							medium ? classes._maxHeight : null,
							medium || small ? classes._noRadius : null,
							small ? classes._fullWidth : null,
							small ? classes._autoHeight : null,
						].join(' ')}
						src={img}
						alt='Card-img-cap'
					/>
				) : (
					<div
						className={[
							medium || small ? classes._noRadius : null,
							medium ? classes._maxHeight : null,
						].join(' ')}
					>
						<LocalFlorist
							className={[
								classes._imgFallback,
								medium || small ? classes._noRadius : null,
							].join(' ')}
						/>
					</div>
				)}
				<CardBody>
					<h4 className={classes.cardTitle}>{name}-lounge</h4>
				</CardBody>
			</Card>
		</>
	);
};

export default ListCard;
