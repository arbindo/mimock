import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';

function BasicTextField({
	label,
	dataTestid,
	errorLabel,
	isError,
	inputValue,
	onChangeHandler,
	onBlurHandler,
	onFocusHandler,
}) {
	return (
		<FormControl data-testid={dataTestid} error={isError}>
			<InputLabel htmlFor='component-outlined'>{label}</InputLabel>
			<OutlinedInput
				data-testid='change-text-field'
				id='component-outlined'
				value={inputValue}
				onChange={onChangeHandler}
				onBlur={onBlurHandler}
				onFocus={onFocusHandler}
				label={label}
			/>

			<If condition={isError}>
				<FormHelperText id='component-error-text'>{errorLabel}</FormHelperText>
			</If>
		</FormControl>
	);
}

BasicTextField.propTypes = {
	label: PropTypes.string.isRequired,
	dataTestid: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	onBlurHandler: PropTypes.func.isRequired,
	onChangeHandler: PropTypes.func.isRequired,
	onFocusHandler: PropTypes.func.isRequired,
	errorLabel: PropTypes.string,
	isError: PropTypes.bool,
};

export default BasicTextField;
