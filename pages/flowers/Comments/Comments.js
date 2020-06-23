import { useState, useEffect } from 'react';
import * as api from '../../constants/api';
import {
	FormControl,
	InputLabel,
	FormHelperText,
	IconButton,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import CustomInput from './node_modules/components/CustomInput/CustomInput.js.js';

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
};

const styles = {
	...customStyles,
};

const useStyles = makeStyles(styles);

const Comments = ({ flowerIndex }) => {
	const classes = useStyles();

	const [comments, setComments] = useState(null);
	const [newComment, setNewComment] = useState('');

	// fetch comments
	const getComments = async () => {
		const res = await api.commentList(flowerIndex);

		console.log('comments res', res);

		if (!res.data) return setComments([]);

		setComments(Object.values(res.data));
	};

	// handle submit
	const commentSubmit = async () => {
		await api
			.createComment({
				flowerIndex,
				payload: newComment,
			})
			.then(() => {
				// reset field
				setNewComment('');

				// fetch updated comment list
				getComments();
			});
	};

	// fetch comments on render
	useEffect(() => {
		getComments();
	}, []);

	// fallback on comments-fail
	if (comments === null) return <div>Loading comments...</div>;

	return (
		<div>
			{comments === null ? (
				<p>Loading comments...</p>
			) : (
				comments.map((item, nth) => <p key={nth}>{item.comment}</p>)
			)}
			<FormControl>
				<Input
					inputProps={{
						required: true,
						onChange: (e) => setNewComment(e.target.value),
						value: newComment,
					}}
					labelText='comment'
					aria-label='comment text'
				/>
				<Button
					variant='contained'
					color='primary'
					className={classes.button}
					onClick={commentSubmit}
				>
					Send
				</Button>
			</FormControl>
		</div>
	);
};

export default Comments;
