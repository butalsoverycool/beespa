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

const customStyle = {
	_card: {
		width: '20rem',
		margin: '5px',
	},
	_imgFallback: {
		width: 'auto',
		height: '180px',
		opacity: '.1',
		background: 'green',
		cursor: `url(${beeCursor}), auto`,
	},
};

const styles = {
	...customStyle,
	...imagesStyles,
	_img: {
		...imagesStyles.imgCardTop,
		cursor: `url(${beeCursor}), auto`,
	},
	cardTitle,
};

const useStyles = makeStyles(styles);

const ListCard = ({ flower }) => {
	const classes = useStyles();

	const { cover_image: img, common_name: name } = flower;

	return (
		<>
			<Card className={classes._card}>
				{img !== '' ? (
					<img
						style={{ height: '180px', width: '100%', display: 'block' }}
						className={classes._img}
						src={img}
						alt='Card-img-cap'
					/>
				) : (
					<LocalFlorist className={classes._imgFallback} />
				)}
				<CardBody>
					<h4 className={classes.cardTitle}>{name}-lounge</h4>
				</CardBody>
			</Card>
		</>
	);
};

export default ListCard;
