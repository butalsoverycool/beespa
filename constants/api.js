import axios from 'axios';

const githubUser = 'butalsoverycool';

const base = 'https://flowers-mock-data.firebaseio.com';

export const flowerList = () => axios.get(base + '/flowers.json');

export const flowerDetails = (flowerIndex) =>
	axios.get(base + `/flowers/${flowerIndex}.json`);

export const commentList = (flowerIndex) =>
	axios.get(base + `/comments/${githubUser}/${flowerIndex}.json`);

export const createComment = ({ flowerIndex, payload }) =>
	axios.post(base + `/comments/${githubUser}/${flowerIndex}.json`, {
		comment: payload,
	});
