import React, { Component, createContext } from 'react';
import * as api from '../constants/api';

const AppContext = createContext(null);

const initialState = {
	flowers: [],
	comments: null,
};

export default class AppState extends Component {
	constructor(props) {
		super(props);

		this.state = { ...initialState };

		this.setters = {
			getComments: this.getComments,
			commentSubmit: this.commentSubmit,
		};

		this.flowerInit = this.flowerInit.bind(this);
		this.getComments = this.getComments.bind(this);
		this.commentSubmit = this.commentSubmit.bind(this);
	}

	componentDidMount = () => {
		this.flowerInit();
	};

	flowerInit = async (props) => {
		const res = await api.flowerList();

		const { data: flowers } = res;

		console.log('flowers', flowers);

		this.setState({ flowers });
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
