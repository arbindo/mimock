import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';

function PasswordField({
	errorLabel,
	dataTestid,
	isError,
	value,
	onChangeHandler,
	onBlurHandler,
	onFocusHandler,
	style,
}) {
	const [values, setValues] = useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	return (
		<FormControl
			data-testid={dataTestid}
			style={{ width: '80%' }}
			variant='outlined'
			error={isError}
		>
			<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
			<OutlinedInput
				data-testid='outlined-password-input'
				id='outlined-adornment-password'
				type={values.showPassword ? 'text' : 'password'}
				value={value}
				onChange={onChangeHandler}
				onBlur={onBlurHandler}
				onFocus={onFocusHandler}
				style={style}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							data-testid='show-password-icon'
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}
							edge='end'
						>
							<Choose>
								<When condition={values.showPassword}>
									<VisibilityOff />
								</When>
								<Otherwise>
									<Visibility />
								</Otherwise>
							</Choose>
						</IconButton>
					</InputAdornment>
				}
				label='Password'
			/>
			<If condition={isError}>
				<FormHelperText id='component-error-text'>{errorLabel}</FormHelperText>
			</If>
		</FormControl>
	);
}

PasswordField.propTypes = {
	value: PropTypes.string.isRequired,
	dataTestid: PropTypes.string.isRequired,
	onBlurHandler: PropTypes.func.isRequired,
	onChangeHandler: PropTypes.func.isRequired,
	onFocusHandler: PropTypes.func.isRequired,
	errorLabel: PropTypes.string,
	isError: PropTypes.bool,
	style: PropTypes.object,
};

export default PasswordField;
