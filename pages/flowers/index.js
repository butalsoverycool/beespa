import { useState } from 'react';
import Link from 'next/link';
import { withAppState } from '../../state';
import { ListCard } from '../../components/FlowerCard';
import FlowerFilter from '../../components/FlowerFilter';

const Flowers = ({ appState, appSetters }) => {
	const [loading, setLoading] = useState(true);

	const { flowers, filter } = appState;
	const { appendErr } = appSetters;

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

		console.log('active', active);

		if (active.length < 1) return true;

		let res = false;
		active.forEach((a) => {
			console.log('compare', flower.sun, Boolean(a));
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
			<h1 style={{ margin: '0 0 40px' }}>Bee Spa</h1>

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
							<a>
								<ListCard flower={flower} />
							</a>
						</Link>
					))}
			</div>

			<style jsx>{`
				h1 {
					text-align: center;
				}
				.flower-list {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					justify-content: center;
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
