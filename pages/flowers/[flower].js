import { useRouter } from 'next/router';
import { withAppState } from '../../state';
import { DetailCard } from '../../components/FlowerCard';

const Flower = ({ appState, appSetters }) => {
	const { flowers } = appState;

	const router = useRouter();
	const flowerIndex = Number(router.query.flower);

	const flower = flowers[flowerIndex];

	// *** temp placeholder
	if (!flower)
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);

	return (
		<>
			<DetailCard flowerIndex={flowerIndex} flower={flower} />
		</>
	);
};

/*
 * buildtime props (below) causes some routing-delay
 * perhaps a dev-mode-thing, but just in case we use ctx-hook for better xperience
 ***********************************************************************************/

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
