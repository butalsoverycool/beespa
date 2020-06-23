import { useState, useEffect } from 'react';
import Link from 'next/link';
import { withAppState } from '../../state';
import { ListCard } from '../../components/FlowerCard';

const Flowers = ({ appState, appSetters }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({
		status: false,
		msg: '',
	});

	const { flowers } = appState;
	const { appendErr } = appSetters;

	// flower loading state
	useEffect(() => {
		if (flowers.length < 1) {
			setLoading(true);
		} else {
			setLoading(false);
		}

		return () => {
			// cleanup...
		};
	}, [flowers]);

	// err state
	useEffect(() => {
		if (error.status === true) {
			appendErr(error.msg, 'flowers' + __filename);

			setError({
				status: false,
				msg: '',
			});
		}

		return () => {
			// cleanup...
		};
	}, [error]);

	// render fallbacks
	if (error.status === true) {
		return (
			<div>
				<h1>Something went wrong...</h1>
			</div>
		);
	}

	if (loading)
		return (
			<div>
				<h1>Loading flowers...</h1>
			</div>
		);

	return (
		<div>
			<h1>Bee Spa</h1>

			<div className='flower-list'>
				{flowers.map((flower, nth) => (
					<Link
						key={flower._id.oid}
						href='/flowers/[flower]'
						as={`/flowers/${nth}`}
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

// *** causes route-delay, using ctx-hook instead
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
