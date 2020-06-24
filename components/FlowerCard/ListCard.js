// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';

import imagesStyles from 'assets/jss/nextjs-material-kit/imagesStyles.js';

import { cardTitle } from 'assets/jss/nextjs-material-kit.js';

import LocalFlorist from '@material-ui/icons/LocalFlorist';

import beeCursor from 'assets/img/bee_icon.png';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const customStyle = {
	_card: {
		width: '100%',
		maxWidth: '20rem',
		margin: '5px',
		background: 'none',
		boxShadow: '0 0 10px #ccc',

		'&:hover': {
			filter: 'contrast(1.2)',
		},
	},
	_cardMedium: {
		boxShadow: 'none',
	},
	_imgContainerLarge: {
		width: '320px',
		height: '213px',
		overflow: 'hidden',
	},
	_imgContainerMedium: {
		width: '100%',
		height: '213px',
		overflow: 'hidden',
		margin: 0,
	},
	_imgContainerSmall: {
		height: '275px',
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
	_parentSize: {
		width: '100%',
		height: '100%',
	},
	_imgMedium: {
		minHeight: '100%',
		minWidth: '100%',
		width: 'auto',
		maxWidth: '120%',
		borderRadius: '0',
	},
	_cardTitle: {
		textAlign: 'center',
		color: '#222',
		'&:hover': {
			transition: '.2s',
			color: 'orange',
		},
	},
	_cardTitleMedium: {
		fontSize: '1em',
		color: 'white',
	},
	_cardBody: {
		background: '#eee',
		borderRadius: '3px',
	},
	_cardBodyMedium: {
		position: 'absolute',
		top: '0',
		background: 'none',
	},
};

const styles = {
	...imagesStyles,
	_img: {
		...imagesStyles.imgCardTop,
		cursor: `url(${beeCursor}), auto`,
		width: '100%',
		height: 'auto',
		minHeight: '213px',
		filter: 'blur(1px) grayscale(100%)',
		'&:hover': {
			filter: 'blur(0) grayscale(20%)',
		},
	},

	cardTitle,
	...customStyle,
};

const useStyles = makeStyles(styles);

const ListCard = ({ flower, appState }) => {
	const classes = useStyles();

	const medium = useMediaQuery('(max-width:679px)');
	const small = useMediaQuery('(max-width:480px)');

	const { cover_image: img, common_name: name } = flower;

	return (
		<>
			<Card
				className={[
					'list-card',
					classes._card,
					medium ? classes._noMargin : null,
					small ? classes._fullWidth : null,
					medium || small ? classes._cardMedium : null,
					medium || small ? classes._parentSize : null,
				].join(' ')}
			>
				<div
					className={[
						'img-container',
						classes._imgContainerLarge,
						medium || small ? classes._imgContainerMedium : null,
						small ? classes._imgContainerSmall : null,
						medium || small ? classes._parentSize : null,
					].join(' ')}
				>
					{img !== '' ? (
						<img
							className={[
								classes._img,
								medium ? classes._imgMedium : null,
							].join(' ')}
							src={img}
							alt='Card-img-cap'
						/>
					) : (
						<LocalFlorist
							className={[
								classes._imgFallback,
								medium || small ? classes._noRadius : null,
							].join(' ')}
						/>
					)}
				</div>
				<CardBody
					className={[
						'card-body',
						classes._cardBody,
						medium ? classes._cardBodyMedium : null,
					].join(' ')}
				>
					<h4
						className={[
							classes.cardTitle,
							classes._cardTitle,
							medium ? classes._cardTitleMedium : null,
						].join(' ')}
					>
						{name}-lounge
					</h4>
				</CardBody>
			</Card>
		</>
	);
};

export default ListCard;
