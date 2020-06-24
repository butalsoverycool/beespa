import { useState } from 'react';
import Link from 'next/link';
import { withAppState } from '../../state';
import { ListCard } from '../../components/FlowerCard';
import FlowerFilter from '../../components/FlowerFilter';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

const styles = {
	intro: {
		margin: '0 auto 55px',
		padding: '10px',
		textAlign: 'center',
		maxWidth: '400px',
		background: 'none',
	},
	introTitle: {
		fontSize: '1.4em',
		margin: '0',
	},
	introText: {
		margin: '0',
		fontStyle: 'italic',
		color: '#777',
	},
};

const useStyles = makeStyles(styles);

const Flowers = ({ appState, appSetters }) => {
	const [loading, setLoading] = useState(true);

	const { flowers, filter } = appState;
	const { appendErr } = appSetters;

	const classes = useStyles();

	const seasonFilter = (flower) => {
		const active = Object.keys(filter.season).filter(
			(a) => filter.season[a] === true
		);

		if (active.length < 1) return true;

		let res = false;
		active.forEach((a) => {
			if (flower.blooming_season === a) res = true;
		});

		return res;
	};

	const sunFilter = (flower) => {
		const active = Object.keys(filter.sun).filter(
			(a) => filter.sun[a] === true
		);

		if (active.length < 1) return true;

		let res = false;
		active.forEach((a) => {
			if (String(flower.sun) === a) res = true;
		});

		return res;
	};

	// *** temp placeholder
	if (!flowers)
		return (
			<div>
				<h1>Loading flowers...</h1>
			</div>
		);

	return (
		<div className='content-container'>
			<h1>Bee Spa</h1>

			<Paper className={classes.intro} elevation={0}>
				{/* <h2 className={classes.introTitle}>Welcome!</h2> */}

				<p className={classes.introText}>
					Our wonderful spa is located in the Royal Cyber Gardens. Feel
					free to bzz around through our private flower-lounges!
				</p>
			</Paper>

			<FlowerFilter />

			<div className='flower-list'>
				{flowers
					.filter((flower) => seasonFilter(flower))
					.filter((flower) => sunFilter(flower))
					.map((flower, nth) => (
						<Link
							key={flower._id.oid}
							href='/flowers/[flower]'
							as={`/flowers/${flower.flowerIndex}`}
						>
							<a className='flower-link'>
								<ListCard flower={flower} />
							</a>
						</Link>
					))}
			</div>

			<style global jsx>{`
				body {
					background: #eee;
				}

				body * {
					transition: 0.2s;
				}
			`}</style>

			<style jsx>{`
				h1 {
					text-align: center;
				}

				.intro {
					text-align: center;
				}
				.intro-title {
				}
				.intro-text {
				}

				.flower-list {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					justify-content: center;
				}

				@media all and (max-width: 679px) {
					.flower-list {
						justify-content: flex-start;
					}
					.flower-link {
						width: 50%;
						height: 50vw;
						margin: 0;
					}
				}

				@media all and (max-width: 480px) {
					.flower-link {
						width: 100%;
						height: 275px;
					}
				}
			`}</style>
		</div>
	);
};

/*
 * buildtime props (below) causes some routing-delay
 * perhaps a dev-mode-thing, but just in case we use ctx-hook for better xperience
 ***********************************************************************************/

// define props at build
/* export async function getStaticProps() {
	const res = await api.getFlowerList();

	const { data: flowers } = res;

	return {
		props: {
			flowers,
		},
	};
} */

export default withAppState(Flowers);
