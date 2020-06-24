// material-ui components
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import LocalFlorist from '@material-ui/icons/LocalFlorist';

import imagesStyles from 'assets/jss/nextjs-material-kit/imagesStyles.js';

import Link from 'next/link';

import { cardTitle } from 'assets/jss/nextjs-material-kit.js';

import beeCursor from 'assets/img/bee_icon.png';

import { Comments, NewComment } from '../Comments';

const customStyles = {
	_container: {
		maxWidth: '800px',
		margin: 'auto',
	},
	_card: {
		width: '100%',
		/* maxWidth: '40rem', */
		margin: '0 auto',
		background: 'whitesmoke',
	},

	_tag: {
		textDecoration: 'underline',
	},

	_notes: {
		fontStyle: 'italic',
	},
	_imgFallback: {
		width: '100%',
		height: 'auto',
		maxHeight: '180px',
		opacity: '.1',
		background: 'green',
		cursor: `url(${beeCursor}), auto`,
	},
	_linkBtn: {
		maxWidth: '300px',
		margin: '10px auto 0',
		border: 'none',
		borderBottom: 'solid 1px #ddd',
		'&:hover': {
			borderBottom: 'solid 1px #aaa',
			background: 'none',
		},
	},
};

const styles = {
	_img: {
		...imagesStyles.imgCardTop,
		cursor: `url(${beeCursor}), auto`,
		filter: 'grayscale(100%)',
		'&:hover': {
			filter: 'grayscale(0)',
		},
		transition: '1s',
	},
	cardTitle,
	...customStyles,
};

const useStyles = makeStyles(styles);

const DetailCard = ({ flowerIndex, flower }) => {
	const classes = useStyles();

	const {
		_id: { oid: id },
		cover_image: img,
		common_name: name,
		latin_name,
		notes,
		blooming_season: season,
		soil,
		sun,
		height,
		depth,
		spacing,
	} = flower;

	const heightFormat =
		height.length === 1
			? height.numberInt
			: `${height[0].numberInt} to ${height[1].numberInt}`;

	return (
		<div className={classes._container}>
			<Comments flowerIndex={flowerIndex} />

			<Card className={classes._card}>
				{img !== '' ? (
					<img className={classes._img} src={img} alt='Card-img-cap' />
				) : (
					<LocalFlorist className={classes._imgFallback} />
				)}

				<Button
					variant='outlined'
					color='default'
					className={classes._linkBtn}
				>
					<Link href='/flowers' as='/flowers'>
						<a style={{ color: 'black' }}>back</a>
					</Link>
				</Button>

				<NewComment flowerIndex={flowerIndex} />

				<CardBody>
					<h4 className={classes.cardTitle}>
						Welcome to our {name}-lounge!
					</h4>
					<h5>
						or as we say in Latin,{' '}
						<span className={classes._tag}>{latin_name}</span>!
					</h5>
					<p>
						Extra spots available this{' '}
						<span className={classes._tag}>{season.toLowerCase()}</span>!
					</p>
					<p>
						Rest your soul on one of these{' '}
						<span className={classes._tag}>{heightFormat}</span> inches
						high fireworks planted{' '}
						<span className={classes._tag}>{depth.numberInt}</span> inches
						down in the <span className={classes._tag}>{soil}</span> soil.{' '}
						<span className={classes._tag}>
							{sun === true
								? 'And why not sunbathe all day just like these magical plants do?'
								: sun === false
								? 'And why not learn how to embrace the darkness just like these magical plants do?'
								: 'You can expect the inner peace to endure all kinds of weather.'}
						</span>{' '}
						Our resort founder once said{' '}
						<span className={classes._tag}>"{notes}"</span>, and this is
						one of the many core principles our staff honors to keep our
						standard on top and your stay memorable. Want both vacation
						and variation? In this private lounge you only have to fly{' '}
						<span className={classes._tag}>{spacing.numberInt}</span>{' '}
						inches to your nearest queensize neighbour. And we can assure
						that every single one of these beautiful flowers is looking
						forward to your visit!
					</p>

					<Button
						variant='outlined'
						color='default'
						className={classes._linkBtn}
					>
						<Link href='/flowers' as='/flowers'>
							<a style={{ color: 'black' }}>back to spa entrance</a>
						</Link>
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default DetailCard;
