import { useState, useEffect } from 'react';
import { withAppState } from '../../state';
import * as api from '../../constants/api';
import {
	FormControl,
	InputLabel,
	FormHelperText,
	IconButton,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from 'components/CustomInput/CustomInput.js';
import 'pure-react-carousel/dist/react-carousel.es.css';
import beeCursor from 'assets/img/bee_icon.png';

import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
} from 'pure-react-carousel';

const Input = (props) => {
	const defaultProps = {
		formControlProps: {
			fullWidth: true,
		},
	};

	const newProps = {
		...defaultProps,
		inputProps: { ...props.inputProps },
		...props,
	};

	return (
		<>
			<CustomInput {...newProps} />
			{props.helper && <FormHelperText>{props.helper}</FormHelperText>}
		</>
	);
};

const customStyles = {
	_submit: {
		cursor: 'pointer',
	},

	_slider: {
		fontSize: '.8em',
		fontStyle: 'italic',
		margin: '0',
	},
	_commentTitle: {
		margin: '0',
	},
};

const styles = {
	...customStyles,
};

const useStyles = makeStyles(styles);

const Comments = ({ flowerIndex, appState, appSetters }) => {
	const { comments } = appState;
	const { getComments } = appSetters;

	const classes = useStyles();

	// fetch comments on render
	useEffect(() => {
		getComments({ flowerIndex });
	}, []);

	return (
		<div
			className={['comments-container', classes._commentsContainer].join(
				' '
			)}
		>
			{comments === null ? (
				<p className='comment-meta-msg'>Loading comments...</p>
			) : (
				<>
					<CarouselProvider
						naturalSlideWidth={window.innerWidth}
						naturalSlideHeight={100}
						totalSlides={comments.length}
						isPlaying={true}
						interval={3000}
						className='carousel-provider'
					>
						{comments.length > 0 && (
							<p className={classes._commentTitle}>Other bees said</p>
						)}
						<Slider
							className={['comment-slider', classes._slider].join(' ')}
						>
							{comments.map((item, nth) => (
								<Slide key={nth} index={nth} className='comment'>
									{item.comment}
								</Slide>
							))}
						</Slider>
					</CarouselProvider>
				</>
			)}
			<style jsx>{`
				.comments-container {
					position: absolute;
					z-index: 1;
					width: 100%;
					height: 60px;
					color: white;
					background: rgba(0, 0, 0, 0.5);
					font-weight: 700;
					cursor: url(${beeCursor}), auto;
					padding: 5px 0 0 5px;
				}

				.comment {
					font-size: 0.8em;
					font-style: italic;
					color: white;
				}
			`}</style>
		</div>
	);
};

export default withAppState(Comments);
