import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { withAppState } from '../../state';
import * as api from '../../constants/api';
import { DetailCard } from '../../components/FlowerCard';
import Comments from '../../components/Comments/Comments';
import { NewComment } from '../../components/Comments';

const Flower = ({ appState, appSetters }) => {
	const { flowers } = appState;

	const router = useRouter();
	const flowerIndex = Number(router.query.flower);

	const flower = flowers[flowerIndex];

	/* useEffect(() => {
		console.log('flower', flower);
	}, []); */

	if (!flower) return <div>fail...</div>;

	return (
		<>
			<DetailCard flowerIndex={flowerIndex} flower={flower} />
			{/* <Comments flowerIndex={flowerIndex} /> */}
			<NewComment flowerIndex={flowerIndex} />
		</>
	);
};

// *** causes route-delay, using ctx-hook instead
/* // generate paths at build for dynamic routing
export async function getStaticPaths() {
	// fresh flower-list
	const res = await api.getFlowerList();
	const { data: flowers } = res;

	// paths to pre-render (atm based on flowerlist-index)
	const paths = flowers.map((flower, nth) => ({
		params: { flower: String(nth) },
	}));

	// return paths, fallback gives 404
	return { paths, fallback: false };
}

// define props at build
export async function getStaticProps({ params }) {
	// get details for a flower based on its flowerlist-index
	const res = await api.getFlowerDetails(params.flower);

	const { data: flower } = res;

	// make details available as props for flower-component
	return {
		props: { flower },
	};
} */

export default withAppState(Flower);
