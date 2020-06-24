import React, { Component, createContext } from 'react';
import * as api from '../constants/api';
import { clone } from '../constants/helperFuncs';

const AppContext = createContext(null);

const initialState = {
	flowers: [],
	comments: null,
	filter: {
		season: {
			Spring: false,
			'Early Spring': false,
			'Mid Spring': false,
			'Late Spring': false,
			Summer: false,
			'Early Summer': false,
			'Mid Summer': false,
			'Late Summer': false,
		},
		sun: {
			true: false,
			false: false,
		},
	},
};

export default class AppState extends Component {
	constructor(props) {
		super(props);

		this.state = clone(initialState);

		this.setters = {
			getComments: this.getComments,
			commentSubmit: this.commentSubmit,
			setFilter: this.setFilter,
		};

		this.flowerInit = this.flowerInit.bind(this);
		this.getComments = this.getComments.bind(this);
		this.commentSubmit = this.commentSubmit.bind(this);
		this.setFilter = this.setFilter.bind(this);
	}

	componentDidMount = () => {
		this.flowerInit();
	};

	flowerInit = async (props) => {
		const res = await api.flowerList();

		const { data: flowers } = res;

		// append flowerIndex, following the "api-id" while keeping them filterable
		const withIndexes = flowers.map((flower, nth) => ({
			...flower,
			flowerIndex: nth,
		}));

		this.setState({ flowers: withIndexes });
	};

	// fetch flower-comments
	getComments = async ({ flowerIndex }) => {
		const res = await api.commentList(flowerIndex);

		// make iterable
		const comments = res.data ? Object.values(res.data) : [];

		this.setState({ comments });
	};

	// handle submit
	commentSubmit = async ({ flowerIndex, payload, callback }) => {
		if (!payload || payload === '') return;

		await api
			.createComment({
				flowerIndex,
				payload,
			})
			.then(() => {
				// fetch updated comment list
				this.getComments({ flowerIndex });

				// optional callback
				if (typeof callback === 'function') callback();
			});
	};

	setFilter = ({ type, key, val, reset, callback }) => {
		this.setState(
			(ps) => {
				if (reset === true) {
					return { filter: clone(initialState.filter) };
				}

				const filter = { ...ps.filter };
				filter[type][key] = val;

				return { filter };
			},
			() => {
				if (typeof callback === 'function') callback();
			}
		);
	};

	render() {
		return (
			<AppContext.Provider
				value={{
					appState: this.state,
					appSetters: this.setters,
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

export const withAppState = (Component) => (props) => (
	<AppContext.Consumer>
		{({ appState, appSetters }) => (
			<Component {...props} appState={appState} appSetters={appSetters} />
		)}
	</AppContext.Consumer>
);
