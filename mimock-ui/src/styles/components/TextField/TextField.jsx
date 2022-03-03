import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function BasicTextField({ label, errorLabel, isError }) {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<FormControl data-testid='text-field' error={isError}>
			<InputLabel htmlFor='component-outlined'>{label}</InputLabel>
			<OutlinedInput
				data-testid='change-text-field'
				id='component-outlined'
				value={inputValue}
				onChange={handleChange}
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
	errorLabel: PropTypes.string,
	isError: PropTypes.bool,
};

export default BasicTextField;
