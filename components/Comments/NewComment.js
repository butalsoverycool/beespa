import { useState } from 'react';
import { withAppState } from '../../state';
import * as api from '../../constants/api';
import { FormControl, FormHelperText, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from 'components/CustomInput/CustomInput.js';

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

const NewComment = ({ flowerIndex, appState, appSetters }) => {
	const [newComment, setNewComment] = useState('');

	const { commentSubmit } = appSetters;

	const classes = useStyles();

	return (
		<>
			<FormControl>
				<Input
					inputProps={{
						required: true,
						onChange: (e) => setNewComment(e.target.value),
						value: newComment,
					}}
					labelText='leave a comment'
					aria-label='comment text'
				/>
				<Button
					variant='contained'
					color='primary'
					className={classes.button}
					onClick={() =>
						commentSubmit({
							flowerIndex,
							payload: newComment,
							callback: () => setNewComment(''),
						})
					}
				>
					Send
				</Button>
			</FormControl>
		</>
	);
};

export default withAppState(NewComment);
